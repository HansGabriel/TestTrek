import React from "react";
import { View, TouchableOpacity } from "react-native";
import PersonalInfoIcon from "../../icons/settings/PersonalInfoIcon";
import RedNotificationIcon from "../../icons/settings/RedNotificationIcon";
import MusicAndEffectsIcon from "../../icons/settings/MusicAndEffectsIcon";
import AboutIcon from "../../icons/settings/AboutIcon";
import RedLogoutIcon from "../../icons/settings/RedLogoutIcon";
import { useAuth } from "@clerk/clerk-expo";
import type { FC } from "react";

const SettingsButtons: FC = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <View className="mx-auto mt-5">
        <TouchableOpacity>
          <PersonalInfoIcon />
        </TouchableOpacity>
      </View>

      <View className="mx-auto mt-5">
        <TouchableOpacity>
          <RedNotificationIcon />
        </TouchableOpacity>
      </View>

      <View className="mx-auto mt-5">
        <TouchableOpacity>
          <MusicAndEffectsIcon />
        </TouchableOpacity>
      </View>

      <View className="mx-auto mt-5">
        <TouchableOpacity>
          <AboutIcon />
        </TouchableOpacity>
      </View>

      <View className="mx-auto mt-5">
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
        >
          <RedLogoutIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsButtons;
