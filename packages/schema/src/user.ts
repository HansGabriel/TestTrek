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
  email: z
    .string({
      errorMap: () => ({
        message: "Email is required",
      }),
    })
    .email({ message: "Not a valid email" }),
  userName: z
    .string({
      errorMap: () => ({
        message: "Username is required",
      }),
    })
    .min(5, "Username is required")
    .max(50, {
      message: "Username must be at most 50 characters",
    }),
  firstName: z.string().min(1, "First Name is required").max(50, {
    message: "First Name must be at most 50 characters",
  }),
  imageUrl: z.string().optional(),
  lastName: z
    .string({
      errorMap: () => ({
        message: "Last Name is required",
      }),
    })
    .min(1, "Last Name is required")
    .max(50, {
      message: "Last Name must be at most 50 characters",
    }),
  about: z
    .string()
    .min(5, {
      message: "About Me must be at least 5 characters",
    })
    .max(500, {
      message: "About Me must be at most 500 characters",
    })
    .optional(),
});

export const highlightUsersInput = z
  .object({
    amountOfUsers: z.number().optional(),
  })
  .optional();

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
    last_name: z.string().nullish(),
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
