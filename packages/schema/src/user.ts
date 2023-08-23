import { z } from "zod";

export const userInfoSchema = z.object({
  fullName: z.string().min(1).max(255),
  dateOfBirth: z.date(),
  phoneNumber: z.string().min(1).max(255),
  country: z.string().min(1).max(255),
  age: z.number().min(1).max(255),
});
