import {
  reviewerFiltersSchema,
  reviewerSchema,
} from "@acme/schema/src/reviewer";
import { router, protectedProcedure } from "../trpc";

export const reviewerRouter = router({
  getAllReviewers: protectedProcedure
    .input(reviewerFiltersSchema)
    .query(({ ctx, input }) => {
      const { reviewerType, sortBy } = input;

      const userId = ctx.auth.userId;

      let whereCondition = {};

      switch (reviewerType) {
        case "user":
          whereCondition = { userId };
          break;
        case "other":
          whereCondition = {
            userId: { not: userId },
            visibility: "public",
          };
          break;
        default:
          throw new Error("Invalid reviewerType provided.");
      }

      return ctx.prisma.reviewer.findMany({
        where: whereCondition,
        orderBy: (() => {
          switch (sortBy) {
            case "newest":
              return { createdAt: "desc" };
            case "oldest":
              return { createdAt: "asc" };
            case "alphabetical":
              return { title: "asc" };
            default:
              return { createdAt: "desc" };
          }
        })(),
        select: {
          id: true,
          userId: true,
          content: true,
          title: true,
          imageUrl: true,
          visibility: true,
          user: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }),

  createReviewer: protectedProcedure
    .input(reviewerSchema)
    .mutation(({ ctx, input }) => {
      const { title, imageUrl, content, visibility } = input;

      const userId = ctx.auth.userId;

      return ctx.prisma.reviewer.create({
        data: {
          title,
          imageUrl,
          content,
          visibility,
          userId,
        },
      });
    }),
});
