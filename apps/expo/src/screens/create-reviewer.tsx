import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  Text,
  Dimensions,
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
import { Controller, useForm } from "react-hook-form";
import TestImagePicker from "../components/ImagePicker";
import { Reviewers } from "@acme/schema/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewerSchema } from "@acme/schema/src/reviewer";
import useImageStore from "../stores/useImageStore";
import AppPicker, { LabelOption } from "../components/pickers/AppPicker";
import { useNavigation } from "@react-navigation/native";
import useToast from "../hooks/useToast";
import { trpc } from "../utils/trpc";

export const CreateReviewerScreen = () => {
  const { showToast } = useToast();
  const navigation = useNavigation();
  const richText = useRef<RichEditor | null>(null);
  const [isToggled, setIsToggled] = useState(false);

  const reviewerImage = useImageStore((state) => state.reviewerImage);
  const resetReviewerImage = useImageStore((state) => state.resetReviewerImage);

  const { mutate: createReviewer, reset } =
    trpc.reviewer.createReviewer.useMutation();

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

  const getDisplayImage = () => {
    if (reviewerImage) {
      return reviewerImage;
    }
    return undefined;
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Reviewers>({
    resolver: zodResolver(reviewerSchema),
    defaultValues: {
      title: "",
      content: "",
      visibility: undefined,
      imageUrl: getDisplayImage(),
    },
  });

  useEffect(() => {
    navigation.addListener("focus", () => {
      if (reviewerImage) {
        setValue("imageUrl", reviewerImage);
      }
    });
  }, [reviewerImage]);

  const removeTags = (htmlContent: string) => {
    if (htmlContent === null || htmlContent === "") {
      return "";
    } else {
      htmlContent = htmlContent.toString();
    }

    return htmlContent.replace(/(<([^>]+)>)/gi, " ");
  };

  const submitReviewerData = (createdData: Reviewers) => {
    const formatContent = removeTags(createdData.content);
    createReviewer(
      {
        title: createdData.title,
        imageUrl: createdData.imageUrl,
        visibility: createdData.visibility,
        content: formatContent,
      },
      {
        onSuccess: () => {
          showToast("Reviewer added successfully");
          resetReviewerImage();
          reset();
          navigation.navigate("MyLibrary");
        },
        onError: () => {
          showToast(`An error occurred`);
          resetReviewerImage();
        },
      },
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <ReusableHeader
        screenName={"Create Reviewer"}
        optionIcon={
          <Entypo
            name="save"
            size={28}
            color="rgb(79 70 229)"
            onPress={handleSubmit(submitReviewerData)}
          />
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-[90%] self-center">
          <Controller
            control={control}
            render={({ field: { value } }) => (
              <TestImagePicker image={value} type="reviewer" />
            )}
            name="imageUrl"
          />
          {errors.imageUrl && (
            <Text className="mt-2 text-red-500">{errors.imageUrl.message}</Text>
          )}
        </View>

        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mt-5 w-[90%] self-center border border-zinc-100">
              <Text
                className={`font-nunito-bold ml-3 text-base leading-snug tracking-tight text-neutral-800`}
              >
                Title
              </Text>
              <TextInput
                onBlur={onBlur}
                className="font-nunito-bold ml-3 h-10 text-lg"
                editable
                placeholder="Input title here"
                maxLength={40}
                onChangeText={onChange}
                value={value}
                cursorColor={"black"}
              />
            </View>
          )}
        />
        {errors.title && (
          <Text className="text-red-500">{errors.title.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => {
            const onTextChange = (option: LabelOption) => {
              onChange(option.value);
            };
            return (
              <View className="w-[90%] self-center border-l border-r border-t border-zinc-100">
                <AppPicker
                  dropDownTextMarginLeft={13}
                  labelMarginLeft="ml-3"
                  borderBottomColor="#f4f4f5"
                  label="Visible to"
                  placeholder="Select visibility"
                  options={[
                    { label: "public", value: "public" },
                    { label: "private", value: "private" },
                  ]}
                  selectedValue={value}
                  setSelectedValue={onTextChange}
                />
              </View>
            );
          }}
          name="visibility"
        />
        {errors.visibility && (
          <Text className="text-red-500">{errors.visibility.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur } }) => {
            return (
              <View className="h-[50%] w-[90%] self-center border-b border-l border-r border-zinc-100">
                <Text
                  className={`font-nunito-bold ml-3 text-base leading-snug tracking-tight text-neutral-800`}
                >
                  Reviewer Content
                </Text>

                <ScrollView
                  className="flex-1"
                  style={{
                    height: Dimensions.get("window").height * 0.75,
                  }}
                >
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                  >
                    <RichEditor
                      ref={richText}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder="Enter your content here :)"
                      androidLayerType="software"
                      className=" font-nunito-medium"
                      useContainer={false}
                      containerStyle={{
                        minHeight: 500,
                        maxHeight: Dimensions.get("screen").height,
                      }}
                    />
                  </KeyboardAvoidingView>
                </ScrollView>
              </View>
            );
          }}
          name="content"
        />
        {errors.content && (
          <Text className="text-red-500">{errors.content.message}</Text>
        )}
      </ScrollView>
      {isToggled ? (
        <View className="z-50 my-3 self-center">
          <FAB
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
      ) : (
        ""
      )}

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
