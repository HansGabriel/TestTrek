import React from "react";
import { View, TouchableOpacity } from "react-native";
import PersonalInfoIcon from "../../icons/settings/PersonalInfoIcon";
import MusicAndEffectsIcon from "../../icons/settings/MusicAndEffectsIcon";
import AboutIcon from "../../icons/settings/AboutIcon";
import RedLogoutIcon from "../../icons/settings/RedLogoutIcon";
import HistoryIcon from "../../icons/settings/HistoryIcon";
import type { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LogoutProps {
  openBottomSheet: () => void;
}

const SettingsButtons: FC<LogoutProps> = ({ openBottomSheet }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 self-center">
      <View className="w-80 self-center">
        <TouchableOpacity
          onPress={() => navigation.navigate("EditPersonalInfo")}
        >
          <PersonalInfoIcon width={"100%"} />
        </TouchableOpacity>
      </View>

      <View className="mt-5 w-80 self-center">
        <TouchableOpacity onPress={() => navigation.navigate("HistoryTest")}>
          <HistoryIcon width={"100%"} />
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
    </SafeAreaView>
  );
};

export default SettingsButtons;
