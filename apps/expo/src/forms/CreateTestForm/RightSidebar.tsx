import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";

import Modal from "react-native-modal";

import { useState } from "react";
import { AppButton } from "../../components/buttons/AppButton";
import { Feather } from "@expo/vector-icons";
import { SkeletonLoader } from "../../components/loaders/SkeletonLoader";
import { truncateString } from "@acme/utils/src/strings";
import { trpc } from "../../utils/trpc";
import { RouterOutputs } from "../../utils/trpc";

import type { FC } from "react";

type Reviewer = RouterOutputs["reviewer"]["getAllReviewers"][number];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setReviewer: (reviewer: Reviewer | null) => void;
  handleConfirmPress: () => void;
  confirmButtonText: string;
}

const RightSidebar: FC<Props> = ({
  isOpen,
  onClose,
  setReviewer,
  handleConfirmPress,
  confirmButtonText = "Go to Reviewer",
}) => {
  const { height, width } = Dimensions.get("window");
  const [reviewerIndex, setReviewerIndex] = useState<number | null>(null);
  const { data: reviewers, isLoading: isFetchingReviewers } =
    trpc.reviewer.getAllReviewers.useQuery({
      reviewerType: "public",
    });

  const handlePress = (index: number) => {
    if (reviewerIndex === index) {
      setReviewerIndex(null);
      setReviewer(null);
      return;
    }
    setReviewerIndex(index);

    const selectedReviewer = reviewers?.[index];
    setReviewer(selectedReviewer ?? null);
  };

  return (
    <Modal
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
      isVisible={isOpen}
      style={{ height: height, width: width }}
      className="self-center"
    >
      <SafeAreaView className="flex-1">
        <View className="ml-auto w-[75%] flex-1 items-center self-center rounded-l-2xl bg-white shadow-lg">
          <View className="mt-7 w-[90%] flex-row self-end ">
            <View className=" mx-auto">
              <Text className="font-nunito-bold text-2xl">Reviewers</Text>
            </View>
            <View className="mr-5">
              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {isFetchingReviewers ? (
            <View className="my-5 h-[50%] w-[90%] flex-col justify-between self-center">
              <View className="my-7">
                <SkeletonLoader isCircular={true} width={"100%"} height={100} />
              </View>
              <View className="my-7">
                <SkeletonLoader isCircular={true} width={"100%"} height={100} />
              </View>
            </View>
          ) : (
            <>
              <ScrollView className="mt-5 w-full flex-1">
                <View className="mx-5 my-5 flex flex-col items-center justify-center gap-y-5">
                  {reviewers?.map((reviewer, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`flex w-[100%] flex-row gap-x-2 rounded-md border ${
                        reviewerIndex === index
                          ? "border-violet-600"
                          : "border-gray-200"
                      } py-2 pr-2`}
                      onPress={() => handlePress(index)}
                    >
                      <Image
                        source={{ uri: reviewer.imageUrl }}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                        }}
                      />
                      <View className="flex flex-col">
                        <Text className="font-nunito-bold text-lg">
                          {truncateString(reviewer.title, 15)}
                        </Text>
                        <Text className="font-nunito-regular text-sm">
                          {truncateString(reviewer.content, 25)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
              <View className="mx-3 mb-5 flex flex-row">
                <AppButton
                  onPress={handleConfirmPress}
                  text={confirmButtonText}
                  buttonColor={
                    reviewerIndex === null ? "gray-400" : "violet-600"
                  }
                  disabled={reviewerIndex === null}
                  borderShadowColor={
                    reviewerIndex === null ? "gray-500" : "indigo-800"
                  }
                  borderRadius="full"
                  fontStyle="bold"
                  textColor="white"
                  TOwidth="full"
                  Vwidth="full"
                />
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default RightSidebar;
