import { View, Text, TouchableOpacity } from "react-native";
import useGoBack from "../../hooks/useGoBack";
import EditIcon from "../../icons/EditIcon";
import LeftArrowIcon from "../../icons/LeftArrowIcon";

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
            <LeftArrowIcon />
          </TouchableOpacity>
          <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
            Reviewer Details
          </Text>
        </View>
        <View>
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
