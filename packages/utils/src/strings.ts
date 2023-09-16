export const getFullName = (
  firstName: string | undefined,
  lastName: string | undefined,
) => {
  if (!firstName || !lastName) {
    return "Anonymous";
  }

  return `${firstName} ${lastName}`;
};
