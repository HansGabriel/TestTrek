import { z } from "zod";
import { userInfoSchema } from "./user";

export type UserInfo = z.infer<typeof userInfoSchema>;
