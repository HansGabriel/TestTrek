import { View, Text, TouchableOpacity } from "react-native";
import useGoBack from "../../hooks/useGoBack";
import EditIcon from "../../icons/EditIcon";
import { Feather } from "@expo/vector-icons";

interface ReviewerHeaderProps {
  showEditIcon: boolean;
  goToEditReviewer: () => void;
}

export const ReviewerDetailsHeader = ({
  showEditIcon = false,
  goToEditReviewer,
}: ReviewerHeaderProps) => {
  const goBack = useGoBack();
  return (
    <>
      <View className="z-50 mx-5  flex flex-row justify-between py-5">
        <View className="flex-row gap-4 self-center">
          <TouchableOpacity
            onPress={goBack}
            className="flex flex-row items-center self-center"
          >
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
            Reviewer Details
          </Text>
        </View>
        <View className="flex flex-row items-center gap-4">
          {showEditIcon && (
            <TouchableOpacity
              onPress={goToEditReviewer}
              className="self-center"
            >
              <EditIcon />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};
