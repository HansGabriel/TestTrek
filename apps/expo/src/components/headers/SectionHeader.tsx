import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import RightArrowIcon from "../../icons/RightArrowIcon";
import type { FC } from "react";

interface BaseProps {
  title?: string;
}

interface WithViewAllProps extends BaseProps {
  hasViewAll?: true;
  onViewAllPress?: () => void;
}

interface WithoutViewAllProps extends BaseProps {
  hasViewAll?: false;
}

type Props = WithViewAllProps | WithoutViewAllProps;

const SectionHeader: FC<Props> = (props) => {
  if (props.hasViewAll) {
    return (
      <SafeAreaView>
        <View className="w-70 h-13 sticky top-2 z-50 mx-6 flex flex-row justify-between bg-white py-2">
          <View>
            <Text className="font-nunito-bold text-xl leading-[30px] text-neutral-800">
              {props.title}
            </Text>
          </View>
          <TouchableOpacity
            className="flex flex-row items-center gap-1"
            onPress={props.onViewAllPress}
          >
            <Text className="font-nunito-bold w-70 text-right text-lg font-semibold leading-6 text-[#6949FF]">
              View All
            </Text>
            <RightArrowIcon />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View className="w-70 h-13 sticky top-2 z-50 mx-6 flex flex-row justify-between bg-white py-2">
        <View>
          <Text className="font-nunito-bold text-xl leading-[30px] text-neutral-800">
            {props.title}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SectionHeader;
