import React from "react";
import {
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { AppButton } from "../components/buttons/AppButton";
import {
  successToast,
  errorToast,
} from "../components/notifications/ToastNotifications";
import XIcon from "../icons/XIcon";
import TestIcon from "../icons/premium/TestIcon";
import ReviewerIcon from "../icons/premium/ReviewerIcon";
import QuestionsIcon from "../icons/premium/QuestionsIcon";
import PdfIcon from "../icons/premium/PdfIcon";
import { trpc } from "../utils/trpc";

import { RootStackScreenProps } from "../types";

export const PremiumScreen = ({
  navigation,
}: RootStackScreenProps<"Premium">) => {
  const trpcUtils = trpc.useContext();

  const goBack = () => {
    navigation.goBack();
  };

  const { data: premiumStatus, isLoading: isGettingPremiumStatus } =
    trpc.user.getUserPremiumStatus.useQuery();

  const { mutate: togglePremiumStatus, isLoading: isTogglingPremiumStatus } =
    trpc.user.toggleUserPremiumStatus.useMutation({
      onSuccess: () => {
        trpcUtils.user.getUserPremiumStatus.invalidate();
        successToast({
          title: "Success",
          message: !premiumStatus
            ? "You are now a premium user"
            : "You are no longer a premium user",
        });
      },
      onError: (err) => {
        console.log(err);
        errorToast({
          title: "Error",
          message: err.message,
        });
      },
    });

  const handleTogglePremiumStatus = () => {
    togglePremiumStatus();
  };

  return (
    <ImageBackground
      source={require("../../assets/images/premium.png")}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="mx-5 my-7 flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={goBack} className="sticky">
            <XIcon colorFill="white" />
          </TouchableOpacity>
          <Text className="font-nunito-semibold mt-3 text-center text-[32px] font-bold leading-[51.20px] text-white">
            PREMIUM BENEFITS
          </Text>

          <View className="my-5 inline-flex  w-full flex-col items-start justify-start rounded-[20px] bg-white p-6">
            <View className="flex w-full items-start justify-start gap-y-3">
              <View className="inline-flex shrink grow basis-0 flex-row items-center justify-center gap-x-3">
                <TestIcon className="my-auto" width={50} height={50} />
                <View className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-y-1.5">
                  <Text className="font-nunito-bold self-stretch text-xl font-bold leading-loose text-neutral-800">
                    More Tests
                  </Text>
                  <Text className="font-nunito-bold self-stretch text-base font-medium leading-snug tracking-tight text-zinc-600">
                    Free users can only create up to 10 tests. Premium users can
                    create up to 50 tests.
                  </Text>
                </View>
              </View>
            </View>
            <View className="my-3 inline-flex h-[0px] w-[334px] items-center justify-center">
              <View className="h-[0px] w-[334px] border border-zinc-100"></View>
            </View>
            <View className="flex w-full items-start justify-start gap-y-3">
              <View className="inline-flex shrink grow basis-0 flex-row items-center justify-center gap-x-3">
                <ReviewerIcon className="my-auto" width={50} height={50} />
                <View className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-y-1.5">
                  <Text className="font-nunito-bold self-stretch text-xl font-bold leading-loose text-neutral-800">
                    More Reviewers
                  </Text>
                  <Text className="font-nunito-bold self-stretch text-base font-medium leading-snug tracking-tight text-zinc-600">
                    Free users can only add up to 5 reviewers. Premium users can
                    add up to 30 reviewers.
                  </Text>
                </View>
              </View>
            </View>
            <View className="my-3 inline-flex h-[0px] w-[334px] items-center justify-center">
              <View className="h-[0px] w-[334px] border border-zinc-100"></View>
            </View>
            <View className="flex w-full items-start justify-start gap-y-3">
              <View className="inline-flex shrink grow basis-0 flex-row items-center justify-center gap-x-3">
                <QuestionsIcon className="my-auto" width={50} height={50} />
                <View className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-y-1.5">
                  <Text className="font-nunito-bold self-stretch text-xl font-bold leading-loose text-neutral-800">
                    More Questions
                  </Text>
                  <Text className="font-nunito-bold self-stretch text-base font-medium leading-snug tracking-tight text-zinc-600">
                    Free users can only add up to 25 questions per test. Premium
                    users can add up to 50 questions per test.
                  </Text>
                </View>
              </View>
            </View>
            <View className="my-3 inline-flex h-[0px] w-[334px] items-center justify-center">
              <View className="h-[0px] w-[334px] border border-zinc-100"></View>
            </View>
            <View className="flex w-full items-start justify-start gap-y-3">
              <View className="inline-flex shrink grow basis-0 flex-row items-center justify-center gap-x-3">
                <PdfIcon className="my-auto" width={50} height={50} />
                <View className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-y-1.5">
                  <Text className="font-nunito-bold self-stretch text-xl font-bold leading-loose text-neutral-800">
                    Export to PDF
                  </Text>
                  <Text className="font-nunito-bold self-stretch text-base font-medium leading-snug tracking-tight text-zinc-600">
                    Premium users can export their tests as reviewers to PDF.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View className="sticky mt-5">
          <View>
            <AppButton
              text={!premiumStatus ? "GO PREMIUM NOW" : "CANCEL PREMIUM"}
              buttonColor="white"
              borderShadowColor="white"
              borderRadius="full"
              fontStyle="bold"
              textColor="violet-600"
              TOwidth="full"
              Vwidth="full"
              Vheight="16"
              onPress={handleTogglePremiumStatus}
              isLoading={isGettingPremiumStatus || isTogglingPremiumStatus}
              disabled={isGettingPremiumStatus || isTogglingPremiumStatus}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
