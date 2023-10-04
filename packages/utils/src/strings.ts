import { truncate } from "lodash";

export const getFullName = (
  firstName: string | undefined,
  lastName: string | undefined,
) => {
  if (!firstName || !lastName) {
    return "Anonymous";
  }

  return `${firstName} ${lastName}`;
};

export const truncateString = (str: string, length = 10, omission = "...") => {
  return truncate(str, {
    length,
    omission,
  });
};
