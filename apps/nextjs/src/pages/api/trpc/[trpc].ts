import { NextApiRequest, NextApiResponse } from "next";
import { appRouter, createContext } from "@acme/api";
import cors from "nextjs-cors";
import { createNextApiHandler } from "@trpc/server/adapters/next";

// export API handler
// export default createNextApiHandler({
//   router: appRouter,
//   createContext,
// });

export const config = {
  maxDuration: 300,
};

// If you need to enable cors, you can do so like this:
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Enable cors
  await cors(req, res);

  // Let the tRPC handler do its magic
  return createNextApiHandler({
    router: appRouter,
    createContext,
  })(req, res);
};

export default handler;
