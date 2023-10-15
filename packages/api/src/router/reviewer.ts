import {
  reviewerFiltersSchema,
  reviewerSchema,
} from "@acme/schema/src/reviewer";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

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
        case "public":
          whereCondition = {
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

  getReviewerById: protectedProcedure
    .input(
      z.object({
        reviewerId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { reviewerId } = input;

      const reviewer = await ctx.prisma.reviewer.findUnique({
        where: { id: reviewerId },
        select: {
          id: true,
          userId: true,
          content: true,
          title: true,
          imageUrl: true,
          visibility: true,
          user: {
            select: {
              username: true,
              firstName: true,
              lastName: true,
              imageUrl: true,
              
            }
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      const isOwner = reviewer?.userId === ctx.auth.userId;

      return { reviewer, isOwner };
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

  updateReviewer: protectedProcedure
    .input(reviewerSchema)
    .input(z.object({ reviewerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { reviewerId, title, imageUrl, content, visibility } = input;

      const userId = ctx.auth.userId;

      const reviewer = await ctx.prisma.reviewer.findUnique({
        where: { id: reviewerId },
      });

      if (!reviewer) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Reviewer not found.",
        });
      }

      if (reviewer.userId !== userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to edit this reviewer.",
        });
      }

      return ctx.prisma.reviewer.update({
        where: { id: reviewerId },
        data: {
          title,
          imageUrl,
          content,
          visibility,
        },
      });
    }),
});
