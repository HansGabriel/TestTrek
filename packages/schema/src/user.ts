import { z } from "zod";

export const userInfoSchema = z.object({
  fullName: z.string().min(1).max(255),
  dateOfBirth: z.date(),
  school: z.string().min(5).max(255),
});

export const userSignupSchema = z.object({
  userName: z.string().min(5).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export const fullUserSchema = userInfoSchema.merge(userSignupSchema);
