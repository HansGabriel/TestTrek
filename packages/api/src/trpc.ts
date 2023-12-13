import { initTRPC, TRPCError } from "@trpc/server";
import { OpenApiMeta } from "trpc-openapi";
import { type Context } from "./context";
import superjson from "superjson";

const t = initTRPC
  .meta<OpenApiMeta>()
  .context<Context>()
  .create({
    transformer: superjson,
    errorFormatter({ shape }) {
      return shape;
    },
  });

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

const isPremium = t.middleware(async ({ next, ctx }) => {
  const userId = ctx.auth.userId;

  if (!userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    });
  }

  const userIsPremium = await ctx.prisma.user
    .findUnique({
      where: {
        userId,
      },
      select: {
        isPremium: true,
      },
    })
    .then((user) => user?.isPremium);

  if (!userIsPremium) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authorized",
    });
  }

  return next({
    ctx: {
      isPremium: userIsPremium,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const premiumProcedure = t.procedure.use(isAuthed).use(isPremium);
