import {
  reviewerFiltersSchema,
  reviewerSchema,
} from "@acme/schema/src/reviewer";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { updateReviewerInAlgolia } from "../services/algoliaApiHandlers/algoliaCudHandlers";

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
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      return reviewer;
    }),

  getDetails: protectedProcedure
    .input(z.object({ reviewerId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { reviewerId } = input;

      const reviewer = await ctx.prisma.reviewer.findUnique({
        where: {
          id: reviewerId,
        },
        select: {
          user: {
            select: {
              userId: true,
            },
          },
        },
      });

      const isOwner = reviewer?.user.userId === ctx.auth.userId;

      const notOwner = reviewer?.user.userId;

      return {
        isOwner,
        notOwner,
      };
    }),

  createReviewer: protectedProcedure
    .input(reviewerSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, imageUrl, content, visibility } = input;
      const userId = ctx.auth.userId;

      const newReviewer = await ctx.prisma.reviewer.create({
        data: {
          title,
          imageUrl,
          content,
          visibility,
          userId,
        },
      });

      if (newReviewer.visibility === "public") {
        const reviewerForAlgolia = await ctx.prisma.reviewer.findUnique({
          where: {
            id: newReviewer.id,
          },
          select: {
            id: true,
            user: {
              select: {
                userId: true,
                imageUrl: true,
                firstName: true,
                lastName: true,
              },
            },
            title: true,
            imageUrl: true,
            createdAt: true,
            updatedAt: true,
            visibility: true,
          },
        });

        if (reviewerForAlgolia !== null) {
          try {
            await updateReviewerInAlgolia(reviewerForAlgolia);
            console.log(`Public reviewer ${newReviewer.id} added to Algolia`);
          } catch (error) {
            console.error(`Error adding reviewer to Algolia: `, error);
            console.error(`Error details: ${JSON.stringify(error, null, 2)}`);
          }
        }
      }

      return newReviewer;
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

      const updatedReviewer = await ctx.prisma.reviewer.update({
        where: { id: reviewerId },
        data: {
          title,
          imageUrl,
          content,
          visibility,
        },
      });

      if (updatedReviewer.visibility === "public") {
        const reviewerForAlgolia = await ctx.prisma.reviewer.findUnique({
          where: {
            id: updatedReviewer.id,
          },
          select: {
            id: true,
            user: {
              select: {
                userId: true,
                imageUrl: true,
                firstName: true,
                lastName: true,
              },
            },
            title: true,
            imageUrl: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            visibility: true,
          },
        });

        if (reviewerForAlgolia !== null) {
          try {
            await updateReviewerInAlgolia(reviewerForAlgolia);
            console.log(
              `Public reviewer ${updatedReviewer.id} updated in Algolia`,
            );
          } catch (error) {
            console.error(`Error updating reviewer in Algolia: `, error);
            console.error(`Error details: ${JSON.stringify(error, null, 2)}`);
          }
        }
      }

      return updatedReviewer;
    }),
});
