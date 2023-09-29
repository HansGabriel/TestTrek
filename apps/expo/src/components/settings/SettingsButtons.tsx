import React from "react";
import { View, TouchableOpacity } from "react-native";
import PersonalInfoIcon from "../../icons/settings/PersonalInfoIcon";
import RedNotificationIcon from "../../icons/settings/RedNotificationIcon";
import MusicAndEffectsIcon from "../../icons/settings/MusicAndEffectsIcon";
import AboutIcon from "../../icons/settings/AboutIcon";
import RedLogoutIcon from "../../icons/settings/RedLogoutIcon";
import type { FC } from "react";
import { useNavigation } from "@react-navigation/native";

interface LogoutProps {
  openBottomSheet: () => void;
}

const SettingsButtons: FC<LogoutProps> = ({ openBottomSheet }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 self-center">
      <View className="mt-5 w-80 self-center">
        <TouchableOpacity
          onPress={() => navigation.navigate("EditPersonalInfo")}
        >
          <PersonalInfoIcon width={"100%"} />
        </TouchableOpacity>
      </View>

      <View className="mt-5 w-80 self-center">
        <TouchableOpacity>
          <RedNotificationIcon width={"100%"} />
        </TouchableOpacity>
      </View>

      <View className="mt-5 w-80 self-center">
        <TouchableOpacity
          onPress={() => navigation.navigate("MusicAndEffects")}
        >
          <MusicAndEffectsIcon width={"100%"} />
        </TouchableOpacity>
      </View>

      <View className="mt-5 w-80 self-center">
        <TouchableOpacity onPress={() => navigation.navigate("AboutTestTrek")}>
          <AboutIcon width={"100%"} />
        </TouchableOpacity>
      </View>

      <View className="mt-5 w-80 self-center">
        <TouchableOpacity onPress={openBottomSheet}>
          <RedLogoutIcon width={"100%"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsButtons;
