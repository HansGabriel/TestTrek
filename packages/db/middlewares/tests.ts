import type { Prisma } from "@prisma/client";

const testsMiddleware: Prisma.Middleware = async (params, next) => {
  if (params.model === "Test") {
    if (params.action === "delete") {
      params.action = "update";
      params.args.data = {
        isDeleted: true,
      };
    }
    if (params.action === "deleteMany") {
      params.action = "updateMany";
      if (params.args.data !== undefined) {
        params.args.data.isDeleted = true;
      } else {
        params.args.data = {
          isDeleted: true,
        };
      }
    }
  }

  return next(params);
};

export default testsMiddleware;
