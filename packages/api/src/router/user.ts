import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const useRouter = router({
  getTop: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().optional().default(5),
        })
        .optional()
        .default({
          limit: 5,
        }),
    )
    .query(({ ctx, input }) => {
      const { limit } = input;
      return ctx.prisma.user.findMany({
        select: {
          id: true,
          imageUrl: true,
          firstName: true,
          lastName: true,
        },
        take: limit,
      });
    }),

  getUserDetails: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst({
      where: {
        userId: ctx.auth.userId,
      },
    });
  }),
});
