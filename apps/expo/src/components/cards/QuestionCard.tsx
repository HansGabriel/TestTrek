import { match } from "ts-pattern";
import { truncateString } from "@acme/utils/src/strings";
import { TouchableOpacity, View, Text, ImageBackground } from "react-native";
import { IMAGE_PLACEHOLDER_LARGE } from "../../constants";

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
  goToQuestionHistory?: (questionId: string) => () => void;
}

const QuestionCard: FC<QuestionCardProps> = ({
  question,
  index,
  type = "create",
  goToEditQuestion,
  goToQuestionHistory,
}) => {
  return (
    <TouchableOpacity
      className="my-2 flex h-[105px] items-center justify-start"
      key={index}
      onPress={match(type)
        .with("create", () => goToEditQuestion?.(index))
        .with("history", () => goToQuestionHistory?.((question as Question).id))
        .exhaustive()}
    >
      <View className="flex shrink grow basis-0 items-center justify-start self-stretch rounded-xl border border-zinc-200 bg-white">
        <View className="relative w-[140px] self-stretch">
          <ImageBackground
            source={{
              uri: question.image ?? IMAGE_PLACEHOLDER_LARGE,
            }}
            imageStyle={{
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
            }}
            className="absolute left-0 top-0 h-[105px] w-[140px] rounded-l-xl"
          />
        </View>
        <Text className="w-ful font-nunito-bold absolute left-40 top-2 text-lg leading-[28.80px] text-neutral-800">
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
