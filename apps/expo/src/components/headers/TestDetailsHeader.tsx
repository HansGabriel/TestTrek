import { View, TouchableOpacity, Text } from "react-native";
import XIcon from "../../icons/XIcon";
import StarIcon from "../../icons/StarIcon";
import EditIcon from "../../icons/EditIcon";
import SelectedStarIcon from "../../icons/SelectedStarIcon";
import { trpc } from "../../utils/trpc";
import useToast from "../../hooks/useToast";

import type { FC } from "react";
import { ReusableHeader } from "./ReusableHeader";
import useGoBack from "../../hooks/useGoBack";

interface Props {
  testId: string;
  showEditIcon?: boolean;
  goToEditTest: () => void;
}

const TestDetailsHeader: FC<Props> = ({
  testId,
  showEditIcon = false,
  goToEditTest,
}) => {
  const trpcUtils = trpc.useContext();

  const { showToast } = useToast();
  const goBack = useGoBack();

  const { data: isFavorite } = trpc.test.getIsFavorite.useQuery({ testId });
  const { mutate: toggleFavorite } = trpc.test.toggleFavorite.useMutation({
    onSuccess: () => {
      if (isFavorite === undefined) {
        return;
      }
      trpcUtils.test.getIsFavorite.invalidate({ testId });
      trpcUtils.test.getDetails.invalidate({
        testId,
      });
      showToast(!isFavorite ? "Added to favorites" : "Removed from favorites");
    },
    onError: (err) => {
      showToast(err.message);
    },
  });

  if (isFavorite === undefined) {
    return (
      <View>
        <ReusableHeader
          screenName={"Test Details"}
          optionIcon={<StarIcon />}
          handleExit={goBack}
        />
      </View>
    );
  }

  const handleToggleFavorite = () => {
    toggleFavorite({
      testId,
    });
  };

  return (
    <>
      <View className="sticky z-50 mx-6 flex flex-row justify-between bg-white py-5">
        <View className="flex flex-row items-center gap-4">
          <TouchableOpacity onPress={goBack}>
            <XIcon />
          </TouchableOpacity>
          <Text className="font-nunito-bold text-2xl leading-[38.40px] text-neutral-800">
            Test Details
          </Text>
        </View>

        <View className="flex flex-row items-center gap-4">
          {showEditIcon && (
            <TouchableOpacity onPress={goToEditTest}>
              <EditIcon />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleToggleFavorite}>
            {isFavorite ? <SelectedStarIcon /> : <StarIcon />}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default TestDetailsHeader;
