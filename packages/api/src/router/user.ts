import { highlightUsersInput, userStoredSchema } from "@acme/schema/src/user";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { Prisma } from "@acme/db";
import pMap from "p-map";
import { updateUserInAlgolia } from "../services/algoliaApiHandlers/algoliaCudHandlers";

import type { _PlayersHighscore } from "../types";
import {
  getPointsBadge,
  verifyAcquiredPointsBadge,
} from "../functions/pointsBadgeHandlers";

export const useRouter = router({
  getTop: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/users/top",
      },
    })
    .input(highlightUsersInput)
    .output(z.any())
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
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  getUserById: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/users/{userId}",
      },
    })
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .output(z.any())
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          userId: input.userId,
        },
      });
    }),

  getUserDetails: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/users/me",
      },
    })
    .input(z.void())
    .output(z.any())
    .query(({ ctx }) => {
      return ctx.prisma.user.findFirst({
        where: {
          userId: ctx.auth.userId,
        },
      });
    }),

  getPlaysByUserId: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/users/{userId}/plays",
      },
    })
    .input(z.object({ userId: z.string() }))
    .output(z.any())
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

  getUserPlays: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/users/me/plays",
      },
    })
    .input(z.void())
    .output(z.any())
    .query(({ ctx }) => {
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

  getTimesUserOnTop: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/users/me/top",
      },
    })
    .input(z.void())
    .output(z.any())
    .query(async ({ ctx }) => {
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
            .$queryRaw<_PlayersHighscore[]>(
              Prisma.sql`
                SELECT
                  DISTINCT ON ("play"."player_id")
                  "user"."user_first_name",
                  "user"."user_image_url",
                  "play"."player_id" AS "id",
                  MAX("play"."play_score") AS "high_score"
                FROM
                  "play"
                JOIN
                  "user"
                ON
                  "play"."player_id" = "user"."clerk_user_id"
                WHERE
                  "play"."play_is_finished" = TRUE
                  AND "play"."test_id" = ${item.testId}
                GROUP BY
                  "play"."player_id",
                  "user"."user_first_name",
                  "user"."user_image_url"
                ORDER BY
                  "play"."player_id",
                  "high_score" DESC
                LIMIT 3;
              `,
            )
            .then((plays) =>
              plays.map((play) => ({
                id: play.id,
                createdAt: play.play_created_at,
                highScore: play.high_score,
                firstName: play.user_first_name,
                imageUrl: play.user_image_url,
              })),
            );
          const userTop3Count = top3Plays.filter(
            (topPlay) => topPlay.id === ctx.auth.userId,
          ).length;
          totalTop3Count += userTop3Count;
        },
        { concurrency: 5 },
      );

      return totalTop3Count;
    }),

  getTotalScore: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/users/me/score",
      },
    })
    .input(z.void())
    .output(z.any())
    .query(({ ctx }) => {
      return ctx.prisma.play.aggregate({
        _sum: {
          score: true,
        },
        where: {
          playerId: ctx.auth.userId,
        },
      });
    }),

  getTotalPoints: protectedProcedure
    .input(z.void())
    .output(z.any())
    .query(async ({ ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          userId: ctx.auth.userId,
        },

        select: {
          totalPoints: true,
        },
      });

      return user;
    }),

  getNewBadges: protectedProcedure
    .input(z.void())
    .output(z.any())
    .query(async ({ ctx }) => {
      const userPoints = await ctx.prisma.user.findUnique({
        where: {
          userId: ctx.auth.userId,
        },
        select: {
          totalPoints: true,
        },
      });

      const userBadges = await ctx.prisma.user.findUnique({
        where: {
          userId: ctx.auth.userId,
        },
        select: {
          badges: true,
        },
      });

      const totalPoints = userPoints?.totalPoints ?? 0;

      const currentBadges = userBadges?.badges ?? [];

      const passedBadge = getPointsBadge(totalPoints);

      const hasNewBadge = verifyAcquiredPointsBadge(passedBadge, currentBadges);

      if (hasNewBadge) {
        await ctx.prisma.user.update({
          where: {
            userId: ctx.auth.userId,
          },
          data: {
            badges: [...currentBadges, ...[passedBadge]],
          },
        });
      }

      return { hasNewBadge: hasNewBadge, acquiredBadge: passedBadge };
    }),

  updateTotalPoints: protectedProcedure
    .input(z.number())
    .output(z.any())
    .mutation(async ({ ctx, input }) => {
      const currentTotal = await ctx.prisma.user.findUnique({
        where: {
          userId: ctx.auth.userId,
        },
        select: {
          totalPoints: true,
        },
      });

      const newTotalSum = currentTotal?.totalPoints
        ? currentTotal.totalPoints + input
        : input;

      const updatedTotalScore = await ctx.prisma.user.update({
        where: {
          userId: ctx.auth.userId,
        },
        data: {
          totalPoints: newTotalSum,
        },
      });

      return updatedTotalScore;
    }),

  getBadges: protectedProcedure
    .input(z.void())
    .output(z.any())
    .query(async ({ ctx }) => {
      const badges = await ctx.prisma.user.findUnique({
        where: {
          userId: ctx.auth.userId,
        },

        select: {
          badges: true,
        },
      });

      return badges;
    }),

  updateBadges: protectedProcedure
    .input(z.array(z.string()))
    .output(z.any())
    .mutation(async ({ ctx, input }) => {
      const currentBadges = await ctx.prisma.user.findUnique({
        where: {
          userId: ctx.auth.userId,
        },
        select: {
          badges: true,
        },
      });
      const updatedBadgeList = currentBadges?.badges
        ? [...currentBadges?.badges, ...input]
        : [...input];

      const updatedUserBadges = ctx.prisma.user.update({
        where: {
          userId: ctx.auth.userId,
        },
        data: {
          badges: updatedBadgeList,
        },
      });

      return updatedUserBadges;
    }),

  getTotalTests: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/users/me/tests",
      },
    })
    .input(z.void())
    .output(z.any())
    .query(({ ctx }) => {
      return ctx.prisma.test.aggregate({
        _count: {
          userId: true,
        },
        where: {
          userId: ctx.auth.userId,
        },
      });
    }),

  getUserWeeklyAndDailyScores: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/users/me/scores",
      },
    })
    .input(z.void())
    .output(z.any())
    .query(async ({ ctx }) => {
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
    .meta({
      openapi: {
        method: "PUT",
        path: "/users/me",
      },
    })
    .input(userStoredSchema)
    .output(z.any())
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

  getUserPremiumStatus: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/users/me/premium",
      },
    })
    .input(z.void())
    .output(z.any())
    .query(async ({ ctx }) => {
      const userIsPremium = await ctx.prisma.user
        .findUnique({
          where: {
            userId: ctx.auth.userId,
          },
          select: {
            isPremium: true,
          },
        })
        .then((user) => user?.isPremium);

      return userIsPremium;
    }),

  toggleUserPremiumStatus: protectedProcedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/users/me/premium",
      },
    })
    .input(z.void())
    .output(z.any())
    .mutation(async ({ ctx }) => {
      const premiumStatus = await ctx.prisma.user
        .findUnique({
          where: {
            userId: ctx.auth.userId,
          },
          select: {
            isPremium: true,
          },
        })
        .then((user) => user?.isPremium);

      const editedUser = await ctx.prisma.user.update({
        where: {
          userId: ctx.auth.userId,
        },
        data: {
          isPremium: premiumStatus ? false : true,
        },
      });

      return editedUser;
    }),
});
