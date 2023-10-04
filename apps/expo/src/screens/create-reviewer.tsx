import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { ReusableHeader } from "../components/headers/ReusableHeader";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FAB } from "@rneui/themed";

export const CreateReviewerScreen = () => {
  const richText = useRef<RichEditor | null>(null);
  const [value, setValue] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const toggleHighlighter = () => {
    setIsToggled(!isToggled);
    if (richText.current) {
      richText.current.setHiliteColor(!isToggled ? "yellow" : "#ffffff");
    }
  };

  const highlightIcon = () => {
    return (
      <FontAwesome5
        name="highlighter"
        size={18}
        color={isToggled ? "#7c3aed" : "black"}
        onPress={toggleHighlighter}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <ReusableHeader
        screenName={"Create Reviewer"}
        optionIcon={<Entypo name="save" size={28} color="rgb(79 70 229)" />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-5 w-[90%] self-center border border-zinc-100">
          <TextInput
            className="font-nunito-bold ml-3 text-lg"
            editable
            multiline
            placeholder="Input title here"
            numberOfLines={4}
            maxLength={40}
            onChangeText={(text) => setValue(text)}
            value={value}
            cursorColor={"black"}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className=" h-96 w-[90%] self-center border-b border-l border-r border-zinc-100">
            <RichEditor
              ref={richText}
              injectedJavaScript={`
              document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
              });
            `}
              placeholder="Enter your text reviewer here :)"
              androidLayerType="software"
              className=" font-nunito-medium z-50"
              initialHeight={300}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View className="z-50 my-3 self-center">
        <FAB
          visible={isToggled}
          size="small"
          color="rgb(79 70 229)"
          title="Generate With AI"
          icon={
            <MaterialCommunityIcons
              name="robot-happy"
              size={24}
              color="white"
            />
          }
        />
      </View>

      <RichToolbar
        editor={richText}
        selectedIconTint="#7c3aed"
        iconTint="#020617"
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.setUnderline,
          actions.undo,
          actions.redo,
          actions.removeFormat,
          actions.hiliteColor,
        ]}
        iconMap={{
          [actions.hiliteColor]: highlightIcon,
        }}
      />
    </SafeAreaView>
  );
};
