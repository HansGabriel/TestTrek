// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapZodError = (error: any) => {
  const errorMessages = JSON.parse(error.message);

  const message = errorMessages[0]["message"];

  return message ?? "Something went wrong";
};
