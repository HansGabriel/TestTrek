import {
  highLightReviewersInput,
  reviewerFiltersSchema,
  reviewerSchema,
} from "@acme/schema/src/reviewer";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
  deleteReviewerFromAlgolia,
  updateReviewerInAlgolia,
} from "../services/algoliaApiHandlers/algoliaCudHandlers";

export const reviewerRouter = router({
  getDiscoverReviewers: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/reviewers/discover",
      },
    })
    .input(highLightReviewersInput)
    .output(z.any())
    .query(({ ctx, input }) => {
      return ctx.prisma.reviewer.findMany({
        ...(input && input.amountOfReviewers
          ? { take: input.amountOfReviewers }
          : { take: 50 }),
        select: {
          id: true,
          title: true,
          userId: true,
          imageUrl: true,
          updatedAt: true,
          createdAt: true,
          user: {
            select: {
              imageUrl: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  getAllReviewers: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/reviewers",
      },
    })
    .input(reviewerFiltersSchema)
    .output(z.any())
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
    .meta({
      openapi: {
        method: "GET",
        path: "/reviewers/{reviewerId}",
      },
    })
    .input(
      z.object({
        reviewerId: z.string(),
      }),
    )
    .output(z.any())
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
    .meta({
      openapi: {
        method: "GET",
        path: "/reviewers/{reviewerId}/details",
      },
    })
    .input(z.object({ reviewerId: z.string() }))
    .output(z.any())
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
    .meta({
      openapi: {
        method: "POST",
        path: "/reviewers",
      },
    })
    .input(reviewerSchema)
    .output(z.any())
    .mutation(async ({ ctx, input }) => {
      const { title, imageUrl, content, visibility } = input;
      const userId = ctx.auth.userId;

      const isUserPremium = await ctx.prisma.user
        .findUnique({
          where: {
            userId,
          },
          select: {
            isPremium: true,
          },
        })
        .then((user) => user?.isPremium);

      const userReviewersCount = await ctx.prisma.reviewer.count({
        where: {
          userId,
        },
      });

      if (!isUserPremium && userReviewersCount >= 5) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Subscribe to create more reviewers.",
        });
      }

      if (isUserPremium && userReviewersCount >= 30) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Maximum amount of reviewers reached.",
        });
      }

      const newReviewer = await ctx.prisma.reviewer.create({
        data: {
          title,
          imageUrl,
          content,
          visibility,
          userId,
        },
      });

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
        } catch (error) {
          console.error(`Error adding reviewer to Algolia: `, error);
          console.error(`Error details: ${JSON.stringify(error, null, 2)}`);
        }
      }

      return newReviewer;
    }),

  updateReviewer: protectedProcedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/reviewers/{reviewerId}",
      },
    })
    .input(reviewerSchema)
    .input(z.object({ reviewerId: z.string() }))
    .output(z.any())
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
        } catch (error) {
          console.error(`Error updating reviewer in Algolia: `, error);
          console.error(`Error details: ${JSON.stringify(error, null, 2)}`);
        }
      }

      return updatedReviewer;
    }),

  delete: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/reviewers/{reviewerId}",
      },
    })
    .input(z.object({ reviewerId: z.string() }))
    .output(z.any())
    .mutation(async ({ ctx, input }) => {
      const { reviewerId } = input;

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
          message: "You are not allowed to delete this reviewer.",
        });
      }

      const deletedReviewer = await ctx.prisma.reviewer.delete({
        where: { id: reviewerId },
      });

      try {
        await deleteReviewerFromAlgolia(reviewerId);
      } catch (error) {
        console.error(`Error removing reviewer from Algolia: ${error}`);
      }

      return deletedReviewer;
    }),
});
