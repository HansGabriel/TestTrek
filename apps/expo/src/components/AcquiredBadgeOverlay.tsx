// BadgeOverlay.js
import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Overlay } from "@rneui/base";
import BronzeBadgeLarge from "../icons/badges/BronzeBadgeLarge";
import SilverBadgeLarge from "../icons/badges/SilverBadgeLarge";
import GoldBadgeLarge from "../icons/badges/GoldBadgeLarge";

interface BadgeOverlayProps {
  isVisible: boolean;
  badgeName: string;
  onClose: () => void;
}

const BadgeOverlay: FC<BadgeOverlayProps> = ({
  isVisible,
  badgeName,
  onClose,
}) => {
  const getBadgeComponent = () => {
    switch (badgeName) {
      case "bronze":
        return <BronzeBadgeLarge />;
      case "silver":
        return <SilverBadgeLarge />;
      case "gold":
        return <GoldBadgeLarge />;
      default:
        return null;
    }
  };

  const getBadgePointsText = () => {
    switch (badgeName) {
      case "bronze":
        return "20,000";
      case "silver":
        return "50,000";
      case "gold":
        return "100,000";
      default:
        return "";
    }
  };

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      overlayStyle={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderWidth: 0,
        borderColor: "rgba(0, 0, 0, 0)",
        justifyContent: "space-evenly",
        shadowColor: "transparent",
      }}
    >
      <View className="items-center">
        {getBadgeComponent()}
        <Text className="font-nunito-extrabold text-center text-2xl text-white">
          Congrats!
        </Text>
        <Text className="font-nunito-extrabold text-center text-lg text-white">
          You Reached {getBadgePointsText()} Total Points
        </Text>
        <Text className="font-nunito-extrabold text-center text-lg text-white">
          Acquired The {badgeName.toUpperCase()} Badge!
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Text className="font-nunito-bold mt-8 text-lg text-violet-300">
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

export default BadgeOverlay;
