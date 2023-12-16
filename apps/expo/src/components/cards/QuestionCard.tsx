import { match } from "ts-pattern";
import { truncateString } from "@acme/utils/src/strings";
import { TouchableOpacity, View, Text, ImageBackground } from "react-native";

import type { FC } from "react";
import type { PartialQuestion } from "../../stores/useQuestionStore";
import type { QuestionType } from "../../stores/useQuestionStore";

interface Question {
  type: QuestionType;
  title: string;
  image: string | null;
  time: number;
  points: number;
  choices: {
    text: string;
    isCorrect: boolean;
    id: string;
  }[];
  id: string;
}

interface QuestionCardProps {
  question: PartialQuestion | Question;
  index: number;
  type?: "history" | "create";
  goToEditQuestion?: (index: number) => () => void;
  goToQuestionHistory?: (
    questionId: string,
    questionIndex: number,
  ) => () => void;
  borderType?: "success" | "error";
}

const QuestionCard: FC<QuestionCardProps> = ({
  question,
  index,
  type = "create",
  goToEditQuestion,
  goToQuestionHistory,
  borderType,
}) => {
  const borderStyle = match(borderType)
    .with("success", () => "border-green-500")
    .with("error", () => "border-red-500")
    .with(undefined, () => "border-zinc-200")
    .exhaustive();

  return (
    <TouchableOpacity
      className="my-2 flex h-[105px] items-center justify-start"
      key={index}
      onPress={match(type)
        .with("create", () => goToEditQuestion?.(index))
        .with("history", () =>
          goToQuestionHistory?.((question as Question).id, index),
        )
        .exhaustive()}
    >
      <View
        className={`flex shrink grow basis-0 items-center justify-start self-stretch rounded-xl border ${borderStyle} bg-white`}
      >
        <View className="relative w-[140px] self-stretch">
          <ImageBackground
            source={
              question.image
                ? {
                    uri: question.image,
                  }
                : require("../../../assets/images/choice-placeholder.png")
            }
            imageStyle={{
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
            }}
            className="absolute left-0 top-0 h-[103px] w-[140px] rounded-l-xl"
          />
        </View>
        <Text className="font-nunito-bold absolute left-40 top-2 w-full text-lg leading-[28.80px] text-neutral-800">
          {index + 1} -{" "}
          {match(question.type)
            .with("multiple_choice", () => "Multiple Choice")
            .with("true_or_false", () => "True or False")
            .with("multi_select", () => "Multi Select")
            .with("identification", () => "Identification")
            .exhaustive()}
        </Text>
        <Text
          className="font-nunito-semibold absolute left-40 top-10 text-base leading-snug tracking-tight text-neutral-700"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {truncateString(question.title, 25)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default QuestionCard;
