import {
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import XIcon from "../../icons/XIcon";

interface ModalProps {
  showAiModal: boolean;
  aiQuestion: string;
  setAiQuestion: (text: string) => void;
  isGenerating: boolean;
  handleQuestionGeneration: () => void;
  handleClose: () => void;
  hasError: boolean;
}

export const AskAiModal = ({
  showAiModal,
  aiQuestion,
  setAiQuestion,
  isGenerating,
  handleQuestionGeneration,
  handleClose,
  hasError,
}: ModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={showAiModal}>
      <TouchableWithoutFeedback disabled={isGenerating}>
        <View className="absolute inset-0 h-[100%] w-[100%] flex-1 bg-black/70">
          <View className="flex-1 items-center justify-center bg-opacity-50 shadow shadow-black/80">
            <View className="h-[25%] w-11/12 rounded-2xl bg-white">
              <View className="h-[50%] w-[100%]  flex-row">
                <View className="mx-auto w-[90%] items-center self-center">
                  <Text className="font-nunito-bold text-xl">
                    What is your question?
                  </Text>
                </View>
                <View className="absolute right-1 top-1">
                  <TouchableOpacity
                    onPress={handleClose}
                    disabled={isGenerating}
                  >
                    <XIcon />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="flex flex-row items-center justify-center px-5">
                <TextInput
                  className={` bg-greyscale-50 h-10 flex-1 rounded-full border py-2 pl-5 pr-10 ${
                    hasError && aiQuestion.length <= 0
                      ? "border-2 border-red-500"
                      : "border-primary-1"
                  }`}
                  placeholder="Ask AI a question"
                  placeholderTextColor="#757575"
                  onChangeText={(text) => setAiQuestion(text)}
                  value={aiQuestion}
                  editable={!isGenerating}
                />

                <TouchableOpacity
                  className="absolute right-8"
                  onPress={handleQuestionGeneration}
                  disabled={isGenerating}
                >
                  {isGenerating && !hasError ? (
                    <ActivityIndicator size="small" />
                  ) : (
                    <Feather name="send" size={24} color="#6949FF" />
                  )}
                </TouchableOpacity>
              </View>
              <View className="items-center justify-center">
                {hasError && aiQuestion.length <= 0 && (
                  <Text className="text-red-500">
                    Ask AI field cannot be empty
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
