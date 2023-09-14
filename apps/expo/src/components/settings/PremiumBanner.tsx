import React from "react";
import { View } from "react-native";
import PremiumBannerBackground from "../../icons/settings/PremiumBannerBackground";
import type { FC } from "react";

const PremiumBanner: FC = () => {
  return (
    <View className="items-center">
      <PremiumBannerBackground width={"90%"} />
    </View>
  );
};

export default PremiumBanner;
