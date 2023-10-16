import type { Prisma } from "@prisma/client";

const testsMiddleware: Prisma.Middleware = async (params, next) => {
  if (params.model === "Test") {
    if (params.action === "findUnique" || params.action === "findFirst") {
      params.action = "findFirst";
      params.args.where["isDeleted"] = false;
    }
    if (params.action === "findMany") {
      if (params.args.where) {
        if (params.args.where.isDeleted == undefined) {
          params.args.where["isDeleted"] = false;
        }
      } else {
        params.args["where"] = { isDeleted: false };
      }
    }

    if (params.action === "delete") {
      params.action = "update";
      params.args["data"] = {
        isDeleted: true,
        deletedAt: new Date(),
      };
    }
    if (params.action === "deleteMany") {
      params.action = "updateMany";
      if (params.args.data !== undefined) {
        params.args["data"].isDeleted = true;
        params.args["data"].deletedAt = new Date();
      } else {
        params.args["data"] = {
          isDeleted: true,
          deletedAt: new Date(),
        };
      }
    }
  }

  return next(params);
};

export default testsMiddleware;
