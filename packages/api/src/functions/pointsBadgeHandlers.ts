export const getPointsBadge = (points: number) => {
  const badges = [];
  if (points >= 100000) {
    badges.push("gold");
  }
  if (points >= 50000) {
    badges.push("silver");
  }
  if (points >= 20000) {
    badges.push("bronze");
  }
  return badges;
};

export const verifyAcquiredPointsBadge = (
  badgeNames: string[],
  currentBadges: string[],
) => {
  return badgeNames.filter((badge) => !currentBadges.includes(badge));
};
