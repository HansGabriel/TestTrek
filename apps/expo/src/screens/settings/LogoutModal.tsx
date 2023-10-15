import React, { FC } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { SafeAreaView, Text, View } from "react-native";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { AppButton } from "../../components/buttons/AppButton";
import { useAuth } from "@clerk/clerk-expo";

interface LogoutProps {
  onChange: (index: number) => void;
  sheetRef: React.RefObject<BottomSheetMethods>;
  snapPoints: string[];
  index: number;
  onClose: () => void;
}

export const LogoutModal: FC<LogoutProps> = ({
  sheetRef,
  snapPoints,
  onChange,
  index,
  onClose,
}) => {
  const { signOut } = useAuth();

  return (
    <SafeAreaView className="z-40 flex-1">
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={onChange}
        index={index}
        onClose={onClose}
        backgroundStyle={{
          borderRadius: 44,
        }}
      >
        <BottomSheetView>
          <View className="w-[90%] items-center self-center border-b border-zinc-100 py-5">
            <Text className="font-nunito-bold text-2xl text-red-500">
              Logout
            </Text>
          </View>
          <View className="w-[90%] items-center self-center py-3">
            <Text className="font-nunito-bold text-lg">
              Are you sure you want to logout?
            </Text>
          </View>
          <View className="mt-3 w-[90%] flex-row items-center justify-between self-center">
            <AppButton
              text="Cancel"
              buttonColor="violet-100"
              borderShadowColor="indigo-800"
              borderRadius="full"
              fontStyle="bold"
              textColor="violet-600"
              TOwidth="1/2"
              Vwidth="36"
              classNameValue="border-r border-l border-t"
              onPress={() => sheetRef.current?.forceClose()}
            />
            <AppButton
              text="Yes, Logout"
              buttonColor="violet-600"
              borderShadowColor="indigo-800"
              borderRadius="full"
              fontStyle="bold"
              textColor="white"
              TOwidth="1/2"
              Vwidth="36"
              onPress={signOut}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};
