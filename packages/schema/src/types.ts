import { z } from "zod";
import { userInfoSchema, userSignupSchema, fullUserSchema } from "./user";
import { imageSchema } from "./image";
import { testDetailsSchema } from "./test";

export type UserInfo = z.infer<typeof userInfoSchema>;
export type UserSignup = z.infer<typeof userSignupSchema>;
export type FullUser = z.infer<typeof fullUserSchema>;
export type TestDetails = z.infer<typeof testDetailsSchema>;
export type ImageDetails = z.infer<typeof imageSchema>;
