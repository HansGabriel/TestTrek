import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { FC } from "react";
import { Overlay } from "@rneui/base";
import BronzeBadgeLarge from "../icons/badges/BronzeBadgeLarge";

interface PointsBadgeAwardsProps {
  badgeName: string;
  showOverlay: boolean;
  onUpdateBadges: (badgeNames: string[]) => void;
}

export const PointsBadgeAwards: FC<PointsBadgeAwardsProps> = ({
  badgeName,
  showOverlay,
  onUpdateBadges,
}) => {
  return <></>;
};
