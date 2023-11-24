import { highlightUsersInput, userStoredSchema } from "@acme/schema/src/user";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { Prisma } from "@acme/db";
import { PlayersHighscore } from "@acme/schema/src/types";
import pMap from "p-map";
import { updateUserInAlgolia } from "../services/algoliaApiHandlers/algoliaCudHandlers";

export const useRouter = router({
  getTop: protectedProcedure
    .input(highlightUsersInput)
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findMany({
        ...(input && input.amountOfUsers
          ? { take: input.amountOfUsers }
          : { take: 50 }),
        select: {
          id: true,
          userId: true,
          imageUrl: true,
          firstName: true,
          lastName: true,
        },
      });
    }),

  getUserById: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          userId: input.userId,
        },
      });
    }),

  getUserDetails: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst({
      where: {
        userId: ctx.auth.userId,
      },
    });
  }),

  getPlaysByUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      return ctx.prisma.play.aggregate({
        _count: {
          playerId: true,
        },
        where: {
          playerId: userId,
        },
      });
    }),

  getUserPlays: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.play.aggregate({
      _count: {
        playerId: true,
      },
      where: {
        playerId: ctx.auth.userId,
        isFinished: true,
      },
    });
  }),

  getTimesUserOnTop: protectedProcedure.query(async ({ ctx }) => {
    const userPlays = await ctx.prisma.play.findMany({
      where: {
        playerId: ctx.auth.userId,
      },
    });

    let totalTop3Count = 0;

    await pMap(
      userPlays,
      async (item) => {
        const top3Plays = await ctx.prisma
          .$queryRaw<PlayersHighscore>(Prisma.sql`
      SELECT
        DISTINCT ON ("Play"."playerId")
        "User"."firstName",
        "User"."imageUrl",
        "Play"."playerId" AS "id",
        MAX("Play"."score") AS "highScore"
      FROM
        "Play"
      JOIN
        "User"
      ON
        "Play"."playerId" = "User"."userId"
      WHERE
        "Play"."isFinished" = TRUE
        AND "Play"."testId" = ${item.testId}
      GROUP BY
        "Play"."playerId",
        "User"."firstName",
        "User"."imageUrl"
      ORDER BY
        "Play"."playerId",
        "highScore" DESC
      LIMIT 3;
    `);

        const userTop3Count = top3Plays.filter(
          (topPlay) => topPlay.id === ctx.auth.userId,
        ).length;
        totalTop3Count += userTop3Count;
      },
      { concurrency: 5 },
    );

    return totalTop3Count;
  }),

  getTotalScore: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.play.aggregate({
      _sum: {
        score: true,
      },
      where: {
        playerId: ctx.auth.userId,
      },
    });
  }),

  getTotalTests: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.test.aggregate({
      _count: {
        userId: true,
      },
      where: {
        userId: ctx.auth.userId,
      },
    });
  }),

  getUserWeeklyAndDailyScores: protectedProcedure.query(async ({ ctx }) => {
    const currentDate = new Date();

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(
      currentDate.getDate() -
        currentDate.getDay() +
        (currentDate.getDay() === 0 ? -6 : 1),
    );
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 7);
    endOfWeek.setHours(23, 59, 59, 999);

    const days = [...Array(7).keys()].map((dayOffset) => {
      const startOfDay = new Date(startOfWeek);
      startOfDay.setDate(startOfWeek.getDate() + dayOffset);
      const endOfDay = new Date(startOfDay);
      endOfDay.setHours(23, 59, 59, 999);

      const startOfDayTimestamp = startOfDay.toISOString();
      const endOfDayTimestamp = endOfDay.toISOString();

      return {
        startOfDay: startOfDayTimestamp,
        endOfDay: endOfDayTimestamp,
      };
    });

    const dailyScores = await Promise.all(
      days.map(async (day) => {
        const dailyScore = await ctx.prisma.play.aggregate({
          _sum: {
            score: true,
          },
          where: {
            playerId: ctx.auth.userId,
            createdAt: {
              gte: new Date(day.startOfDay),
              lte: new Date(day.endOfDay),
            },
          },
        });

        return dailyScore._sum.score || 0;
      }),
    );

    const weeklyScore = await ctx.prisma.play.aggregate({
      _sum: {
        score: true,
      },
      where: {
        playerId: ctx.auth.userId,
        createdAt: {
          gte: new Date(startOfWeek.toISOString()),
          lte: new Date(endOfWeek.toISOString()),
        },
      },
    });

    return {
      weeklyScore: weeklyScore._sum.score || 0,
      dailyScores,
    };
  }),

  editUserDetails: protectedProcedure
    .input(userStoredSchema)
    .mutation(async ({ ctx, input }) => {
      const { userName, firstName, lastName, email, about } = input;

      const editedUser = await ctx.prisma.user.update({
        where: {
          userId: ctx.auth.userId,
        },
        data: {
          username: userName,
          firstName,
          lastName,
          email,
          about,
        },
      });

      const userForAlgolia = await ctx.prisma.user.findUnique({
        where: {
          id: editedUser.id,
        },
        select: {
          id: true,
          userId: true,
          firstName: true,
          lastName: true,
          email: true,
          imageUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (userForAlgolia !== null) {
        try {
          await updateUserInAlgolia(userForAlgolia);
        } catch (error) {
          console.error(`Error adding user to Algolia: `, error);
          console.error(`Error details: ${JSON.stringify(error, null, 2)}`);
        }
      }

      return editedUser;
    }),
});
