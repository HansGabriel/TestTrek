import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView, View } from "react-native";
import SettingsHeader from "../../components/headers/SettingsHeader";
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
        <SettingsButtons openBottomSheet={openBottomSheet} />
      </View>
      {/* Overlay to darken the screen, but under the modal */}
      {isModalOpen && (
        <View
          className="absolute inset-0 z-10 bg-black/70" // semi-transparent black
        ></View>
      )}
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
