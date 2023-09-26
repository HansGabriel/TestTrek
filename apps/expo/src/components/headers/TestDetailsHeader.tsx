import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import XIcon from "../../icons/XIcon";
import StarIcon from "../../icons/StarIcon";
import EditIcon from "../../icons/EditIcon";
import SelectedStarIcon from "../../icons/SelectedStarIcon";
import { trpc } from "../../utils/trpc";
import useToast from "../../hooks/useToast";

import type { FC } from "react";

interface Props {
  testId: string;
  goToEditTest: () => void;
}

const TestDetailsHeader: FC<Props> = ({ testId, goToEditTest }) => {
  const trpcUtils = trpc.useContext();
  const navigation = useNavigation();
  const { showToast } = useToast();

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
    return <></>;
  }

  const handleToggleFavorite = () => {
    toggleFavorite({
      testId,
    });
  };

  return (
    <>
      <View className="sticky top-9 z-50 mx-6 mb-10 flex flex-row justify-between bg-white py-5">
        <TouchableOpacity
          className="flex flex-row items-center gap-4"
          onPress={() => navigation.navigate("Home")}
        >
          <XIcon />
        </TouchableOpacity>
        <View className="flex flex-row items-center gap-4">
          <TouchableOpacity onPress={goToEditTest}>
            <EditIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggleFavorite}>
            {isFavorite ? <SelectedStarIcon /> : <StarIcon />}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default TestDetailsHeader;
