import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  all: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/posts/all",
      },
    })
    .input(z.void())
    .output(z.any())
    .query(({ ctx }) => {
      return ctx.prisma.post.findMany();
    }),
  byId: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/posts/{id}",
      },
    })
    .input(z.string())
    .output(z.any())
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findFirst({ where: { id: input } });
    }),
  create: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/posts",
      },
    })
    .input(z.object({ title: z.string(), content: z.string() }))
    .output(z.any())
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({ data: input });
    }),
});
