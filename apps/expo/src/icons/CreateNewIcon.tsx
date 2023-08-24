import { View } from "react-native";
import Plus from "./svgs/CreateNew.svg";

export function CreateNewIcon() {
  return (
    <View className="pt-0.25 pl-0.25 h-6 w-6 flex-shrink-0 flex-row items-center justify-center pr-0.5 pb-0.5">
      <Plus className="w-5.375 h-5.375 flex-shrink-0" />
    </View>
  );
}
