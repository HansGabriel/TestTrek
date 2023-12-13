export const getPointsBadge = (points: number) => {
  if (points >= 100000) {
    return "gold";
  } else if (points >= 50000) {
    return "silver";
  } else if (points >= 20000) {
    return "bronze";
  }
  return "";
};

export const verifyAcquiredPointsBadge = (
  badgeName: string,
  currentBadges: string[],
) => {
  return !currentBadges.includes(badgeName);
};
