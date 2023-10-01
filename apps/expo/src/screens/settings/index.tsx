import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView, View } from "react-native";
import SettingsHeader from "../../components/headers/SettingsHeader";
import PremiumBanner from "../../components/settings/PremiumBanner";
import SettingsButtons from "../../components/settings/SettingsButtons";
import { LogoutModal } from "./LogoutModal";

export const SettingsScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = ["25%", "75%"];

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
    setIsModalOpen(true);
  };

  const handleSheetChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetRef.current?.forceClose();
    }
  }, []);

  return (
    <SafeAreaView
      className="flex-1 flex-col"
      style={{
        backgroundColor: isModalOpen ? "#09101D" : "white",
      }}
    >
      <View
        className={`flex-1 flex-col ${
          isModalOpen ? " z-30 opacity-70" : "z-50"
        }`}
        pointerEvents={`${isModalOpen ? "none" : "auto"}`}
      >
        <SettingsHeader screenName={"Settings"} />
        <PremiumBanner />
        <SettingsButtons openBottomSheet={openBottomSheet} />
      </View>
      <LogoutModal
        sheetRef={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onClose={() => setIsModalOpen(false)}
      />
    </SafeAreaView>
  );
};
