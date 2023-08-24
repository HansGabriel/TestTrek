import { View } from "react-native";
import Profile from "./svgs/Profile.svg";

export function ProfileIcon() {
  return (
    <View className="h-6 w-6 flex-shrink-0 flex-row items-center justify-center pt-0.5 pr-1 pb-0.5 pl-1">
      <Profile className="w-3.96 h-4.967 flex-shrink-0" />
    </View>
  );
}
