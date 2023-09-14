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
      <View className="mt-5 w-80 self-center">
        <TouchableOpacity>
          <PersonalInfoIcon width={"100%"} />
        </TouchableOpacity>
      </View>

      <View className="mt-5 w-80 self-center">
        <TouchableOpacity>
          <RedNotificationIcon width={"100%"} />
        </TouchableOpacity>
      </View>

      <View className="mt-5 w-80 self-center">
        <TouchableOpacity>
          <MusicAndEffectsIcon width={"100%"} />
        </TouchableOpacity>
      </View>

      <View className="mt-5 w-80 self-center">
        <TouchableOpacity>
          <AboutIcon width={"100%"} />
        </TouchableOpacity>
      </View>

      <View className="mt-5 w-80 self-center">
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
        >
          <RedLogoutIcon width={"100%"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsButtons;
