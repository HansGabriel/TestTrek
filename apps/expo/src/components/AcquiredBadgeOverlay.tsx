import React, { FC } from "react";
import { View, Text } from "react-native";
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
          CONGRATS!
        </Text>
        <Text className="font-nunito-bold text-center text-lg text-white">
          You received the {badgeName.toUpperCase()} badge
        </Text>
        <Text className="font-nunito-bold text-center text-lg text-white">
          for reaching {getBadgePointsText()} total points!
        </Text>
      </View>
    </Overlay>
  );
};

export default BadgeOverlay;
