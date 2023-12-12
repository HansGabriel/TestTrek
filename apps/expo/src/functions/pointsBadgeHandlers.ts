export const getPointsBadge = (points: number) => {
  if (points >= 20000) {
    return "bronze";
  } else if (points >= 50000) {
    return "silver";
  } else if (points >= 100000) {
    return "gold";
  }

  return "none";
};
