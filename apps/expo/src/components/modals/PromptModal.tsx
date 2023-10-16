import React from "react";

import { View, SafeAreaView, Text, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { AppButton } from "../buttons/AppButton";

interface ModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  modalIcon: React.ReactNode;
  modalTitle: string;
  modalDescription: string;
  confirmButtonText: string;
  cancelButtonText?: string;
  isCancelButtonVisible?: boolean;
  isLoading?: boolean;
}

export const PromptModal = ({
  isVisible,
  onConfirm,
  modalIcon,
  modalTitle,
  modalDescription,
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
        style={{ width: width * 0.9, height: height }}
      >
        <View className="h-[40%] w-full items-center justify-evenly self-center rounded-2xl border border-zinc-100 bg-white">
          <View>{modalIcon}</View>
          <View>
            <Text className="font-nunito-bold self-center text-center text-2xl">
              {modalTitle}
            </Text>
            <Text className="font-nunito-semibold self-center px-8 text-center text-xl">
              {modalDescription}
            </Text>
          </View>

          <View className="w-[90%] flex-row items-center justify-evenly self-center">
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
                  Vwidth="32"
                  onPress={onCancel}
                  isLoading={isLoading}
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
                Vwidth="32"
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
