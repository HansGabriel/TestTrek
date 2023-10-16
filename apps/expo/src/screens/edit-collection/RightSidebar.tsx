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
import {
  errorToast,
  successToast,
} from "../../components/notifications/ToastNotifications";

import type { FC } from "react";

type TestSelections = RouterOutputs["test"]["getCollectionTests"];

interface Props {
  collectionId: string;
  isOpen: boolean;
  onClose: () => void;
  handleConfirmPress: () => void;
  confirmButtonText?: string;
}

const RightSidebar: FC<Props> = ({
  collectionId,
  isOpen,
  onClose,
  handleConfirmPress,
  confirmButtonText = "Add to Collection",
}) => {
  const trpcUtisl = trpc.useContext();
  const { height, width } = Dimensions.get("window");
  const [tests, setTests] = useState<TestSelections>([]);

  const { isLoading: isFetchingPublicTests } =
    trpc.test.getCollectionTests.useQuery(
      {
        collectionId,
        type: "all",
      },
      {
        onSuccess: (data) => {
          setTests(data);
        },
      },
    );

  const {
    mutate: updateTestsOnCollection,
    isLoading: isUpdatingTestsOnCollection,
  } = trpc.collection.updateTestsOnCollection.useMutation({
    onSuccess: () => {
      trpcUtisl.test.getCollectionTests.invalidate({
        collectionId,
        type: "public",
      });
      handleConfirmPress();
      successToast({
        message: "Tests added to collection",
        title: "Success",
      });
    },
    onError: (err) => {
      errorToast({
        message: err.message,
        title: "Error",
      });
    },
  });

  const handlePress = (index: number) => {
    const updatedTests = tests.map((test, i) => {
      if (i === index) {
        return {
          ...test,
          isSelected: !test.isSelected,
        };
      }
      return test;
    });
    setTests(updatedTests);
  };

  const addToCollection = () => {
    const selectedTests = tests.filter((test) => test.isSelected);
    const selectedTestIds = selectedTests.map((test) => test.id);
    updateTestsOnCollection({
      collectionId,
      testIds: selectedTestIds,
    });
  };

  const noneSelected = tests.every((test) => !test.isSelected);

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
              <Text className="font-nunito-bold text-2xl">Public Tests</Text>
            </View>
            <View className="mr-5">
              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {isFetchingPublicTests ? (
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
                  {tests?.map((test, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`flex w-[100%] flex-row gap-x-2 rounded-md border ${
                        test.isSelected
                          ? "border-violet-600"
                          : "border-gray-200"
                      } py-2 pr-2`}
                      onPress={() => handlePress(index)}
                    >
                      <Image
                        source={{ uri: test.imageUrl }}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                        }}
                      />
                      <View className="flex flex-col">
                        <Text className="font-nunito-bold text-lg">
                          {truncateString(test.title, 15)}
                        </Text>
                        <Text className="font-nunito-regular text-sm">
                          {truncateString(test.description, 25)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
              <View className="mx-3 mb-5 flex flex-row">
                <AppButton
                  onPress={addToCollection}
                  text={confirmButtonText}
                  buttonColor={noneSelected ? "gray-400" : "violet-600"}
                  disabled={noneSelected}
                  borderShadowColor={noneSelected ? "gray-500" : "indigo-800"}
                  borderRadius="full"
                  fontStyle="bold"
                  textColor="white"
                  TOwidth="full"
                  Vwidth="full"
                  isLoading={isUpdatingTestsOnCollection}
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
