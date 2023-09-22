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

export const userSigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export const userStoredSchema = z.object({
  email: z.string().email({ message: "Not a valid email" }),
  user_name: z.string().min(1, "Username is required"),
  first_name: z.string().min(1, "First Name is required"),
  image_url: z.string().optional(),
  last_name: z.string().min(1, "Last Name is required"),
});

export const userWebhookSchema = z
  .object({
    email_addresses: z
      .array(
        z.object({
          email_address: z.string(),
        }),
      )
      .transform((val) => {
        const emailAddresses = val.map((v) => v.email_address);
        return emailAddresses[0];
      }),
    first_name: z.string(),
    id: z.string(),
    image_url: z.string().optional(),
    last_name: z.string(),
  })
  .transform((val) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email_addresses, ...rest } = val;

    if (!email_addresses) {
      throw new Error("No email address provided");
    }

    return {
      ...rest,
      email: email_addresses,
    };
  });

export const fullUserSchema = userInfoSchema.merge(userSignupSchema);
