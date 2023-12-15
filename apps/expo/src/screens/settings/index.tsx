import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsHeader from "../../components/headers/SettingsHeader";
import SettingsButtons from "../../components/settings/SettingsButtons";
import GoPremiumBanner from "../../icons/settings/GoPremiumBanner";
import CancelPremiumBanner from "../../icons/settings/CancelPremiumBanner";
import { AlertModal } from "../../components/modals/AlertModal";
import { LogoutModal } from "./LogoutModal";
import { useNavigation } from "@react-navigation/native";
import {
  successToast,
  errorToast,
} from "../../components/notifications/ToastNotifications";
import { trpc } from "../../utils/trpc";

export const SettingsScreen = () => {
  const navigation = useNavigation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = ["25%", "75%"];

  const trpcUtils = trpc.useContext();

  const { data: premiumStatus, isLoading: isGettingPremiumStatus } =
    trpc.user.getUserPremiumStatus.useQuery();

  const { mutate: togglePremiumStatus, isLoading: isTogglingPremiumStatus } =
    trpc.user.toggleUserPremiumStatus.useMutation({
      onSuccess: () => {
        trpcUtils.user.getUserPremiumStatus.invalidate();
        setIsAlertModalOpen(false);
        successToast({
          title: "Success",
          message: !premiumStatus
            ? "You are now a premium user"
            : "You are no longer a premium user",
        });
      },
      onError: (err) => {
        errorToast({
          title: "Error",
          message: err.message,
        });
        setIsAlertModalOpen(false);
      },
    });

  const handleTogglePremiumStatus = () => {
    togglePremiumStatus();
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    setIsModalOpen(true);
  };

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetRef.current?.forceClose();
    }
  }, []);

  const goToPremiumScreen = () => {
    navigation.navigate("Premium");
  };

  const { height, width } = Dimensions.get("window");

  return (
    <SafeAreaView
      style={{ height: height, width: width }}
      className={`flex-1 flex-col ${
        isModalOpen ? "inset-0 z-10 bg-black/50" : ""
      }`}
    >
      <View
        className={`flex-1 flex-col ${
          isModalOpen ? "z-30 opacity-70" : "z-50"
        }`}
        pointerEvents={`${isModalOpen ? "none" : "auto"}`}
      >
        <SettingsHeader screenName={"Settings"} />
        {!premiumStatus ? (
          <GoPremiumBanner onPress={goToPremiumScreen} />
        ) : (
          <CancelPremiumBanner onPress={() => setIsAlertModalOpen(true)} />
        )}
        <SettingsButtons openBottomSheet={openBottomSheet} />
      </View>
      {isModalOpen && (
        <View className="absolute inset-0 z-10 bg-black/70"></View>
      )}
      <LogoutModal
        sheetRef={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onClose={() => setIsModalOpen(false)}
      />
      <AlertModal
        isVisible={isAlertModalOpen}
        alertTitle="Are You Sure?"
        alertDescription="This will cancel your premium status and you will lose premium benefits"
        isCancelButtonVisible={true}
        confirmButtonText="Yes"
        cancelButtonText="No"
        onConfirm={handleTogglePremiumStatus}
        isLoading={isTogglingPremiumStatus || isGettingPremiumStatus}
        onCancel={() => setIsAlertModalOpen(false)}
      />
    </SafeAreaView>
  );
};
