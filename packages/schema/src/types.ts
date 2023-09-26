import { z } from "zod";
import {
  userInfoSchema,
  userSignupSchema,
  userSigninSchema,
  fullUserSchema,
  userWebhookSchema,
  userStoredSchema,
} from "./user";
import { imageSchema, stockImagesSchema } from "./image";
import { testDetailsSchema, questionSchema, testInputSchema } from "./test";
import { collectionsSchema } from "./collection";

export type UserInfo = z.infer<typeof userInfoSchema>;
export type UserSignup = z.infer<typeof userSignupSchema>;
export type FullUser = z.infer<typeof fullUserSchema>;
export type TestDetails = z.infer<typeof testDetailsSchema>;
export type ImageDetails = z.infer<typeof imageSchema>;
export type UserSignin = z.infer<typeof userSigninSchema>;
export type Question = z.infer<typeof questionSchema>;
export type TestInput = z.infer<typeof testInputSchema>;
export type UserWebhook = z.infer<typeof userWebhookSchema>;
export type StockImages = z.infer<typeof stockImagesSchema>;
export type UserStored = z.infer<typeof userStoredSchema>;
export type Collections = z.infer<typeof collectionsSchema>;
