import React from "react";

import { View, SafeAreaView, Text, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { AppButton } from "../buttons/AppButton";
import { Foundation } from "@expo/vector-icons";

interface ModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  alertIcon?: React.ReactNode;
  alertTitle: string;
  alertDescription: string;
  confirmButtonText: string;
  cancelButtonText?: string;
  isCancelButtonVisible?: boolean;
  isLoading?: boolean;
}

export const AlertModal = ({
  isVisible,
  onConfirm,
  alertIcon = <Foundation name="alert" size={40} color="#7c3aed" />,
  alertTitle,
  alertDescription,
  confirmButtonText,
  cancelButtonText = "",
  isCancelButtonVisible = false,
  onCancel,
  isLoading,
}: ModalProps) => {
  const { width, height } = Dimensions.get("window");

  return (
    <Modal isVisible={isVisible}>
      <SafeAreaView
        className="z-50 flex-1 justify-center self-center"
        style={{ width: width * 0.8, height: height }}
      >
        <View className="h-[30%] w-full items-center justify-evenly self-center rounded-2xl border border-zinc-100 bg-white">
          <View className="my-3">{alertIcon}</View>
          <View>
            <Text className="font-nunito-bold self-center text-center text-lg">
              {alertTitle}
            </Text>
            <Text className="font-nunito-semibold self-center px-7 text-center text-sm">
              {alertDescription}
            </Text>
          </View>

          <View className="my-4 w-[90%] flex-row items-center justify-evenly self-center">
            {isCancelButtonVisible && (
              <View>
                <AppButton
                  text={cancelButtonText}
                  buttonColor="white"
                  borderShadowColor="indigo-800"
                  borderRadius="full"
                  fontStyle="bold"
                  textColor="violet-600"
                  TOwidth="full"
                  Vwidth="24"
                  Vheight="10"
                  onPress={onCancel}
                  disabled={isLoading}
                />
              </View>
            )}

            <View>
              <AppButton
                text={confirmButtonText}
                buttonColor="violet-600"
                borderShadowColor="indigo-800"
                borderRadius="full"
                fontStyle="bold"
                textColor="white"
                TOwidth="full"
                Vwidth="24"
                Vheight="10"
                onPress={onConfirm}
                isLoading={isLoading}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
