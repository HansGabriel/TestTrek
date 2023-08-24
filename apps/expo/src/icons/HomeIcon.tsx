import { View } from "react-native";
import Home from "./svgs/Home.svg";

export function HomeIcon() {
  return (
    <View className="h-6 w-6 flex-shrink-0 flex-row items-center justify-center py-0.5 px-1">
      <Home className="w-4.75 h-5 flex-shrink-0" />
    </View>
  );
}
