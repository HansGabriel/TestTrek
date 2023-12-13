import React from "react";
import { TouchableOpacity } from "react-native";
import PremiumBannerBackground from "../../icons/settings/PremiumBannerBackground";
import type { FC } from "react";

interface PremiumBannerProps {
  onPress: () => void;
}

const PremiumBanner: FC<PremiumBannerProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="items-center">
      <PremiumBannerBackground width={"90%"} />
    </TouchableOpacity>
  );
};

export default PremiumBanner;
