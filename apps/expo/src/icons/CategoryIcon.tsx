import { View } from "react-native";
import Category from "./svgs/Category.svg";

export function CategoryIcon() {
  return (
    <View className="h-6 w-6 flex-shrink-0 flex-row items-center justify-center pt-0.5 pr-1 pb-1 pl-0.5">
      <Category className="w-4.875 h-4.875 flex-shrink-0" />
    </View>
  );
}
