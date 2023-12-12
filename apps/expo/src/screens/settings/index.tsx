import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsHeader from "../../components/headers/SettingsHeader";
import SettingsButtons from "../../components/settings/SettingsButtons";
import PremiumBanner from "../../components/settings/PremiumBanner";
import { LogoutModal } from "./LogoutModal";
import { useNavigation } from "@react-navigation/native";

export const SettingsScreen = () => {
  const navigation = useNavigation();

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
        <PremiumBanner onPress={goToPremiumScreen} />
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
    </SafeAreaView>
  );
};
