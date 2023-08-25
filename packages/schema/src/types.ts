import { z } from "zod";
import { userInfoSchema, userSignupSchema, fullUserSchema } from "./user";

export type UserInfo = z.infer<typeof userInfoSchema>;
export type UserSignup = z.infer<typeof userSignupSchema>;
export type FullUser = z.infer<typeof fullUserSchema>;
