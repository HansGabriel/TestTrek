import { View, Text } from "react-native";

import WatchTimerIcon from "../icons/WatchTimerIcon";

import type { FC } from "react";

type Props = {
  timeInSeconds: number;
  totalSecondsRemaining: number;
};

const TIMER_THRESHOLD = 0.93;

const CountdownTimerDecoy: FC<Props> = ({
  timeInSeconds,
  totalSecondsRemaining,
}) => {
  const paddedTime = (seconds: number) => {
    return seconds.toString().padStart(2, "0");
  };

  const remainingPercentage =
    ((totalSecondsRemaining / timeInSeconds) * 100) / 100;
  const clampedPercentage = Math.min(
    100,
    Math.max(0, remainingPercentage * 100),
  );

  const getFontSize = (seconds: number) => {
    const numDigits = seconds.toString().length;
    if (numDigits === 3) {
      return 8; // smaller font size for 3 digits
    }
    return 10; // default font size for 1 or 2 digits
  };

  return (
    <View className="mt-5 flex h-4 w-full items-center justify-center gap-x-3 self-center">
      <View className="relative h-4 w-full">
        <View className="absolute left-0 top-0 h-4 w-full">
          <View className="absolute left-0 top-0 h-4 w-full rounded-[100px] bg-zinc-100" />
          <Text
            style={{ fontSize: getFontSize(timeInSeconds) }}
            className={`font-nunito-bold z-20 my-auto ml-auto mr-2 text-end font-bold tracking-tight text-black ${
              remainingPercentage > TIMER_THRESHOLD ? "hidden" : ""
            }`}
          >
            {paddedTime(timeInSeconds)}
          </Text>
          <View
            className={`absolute left-0 top-0 h-4 w-full rounded-[100px] ${calculateColor(
              remainingPercentage,
            )}`}
            style={{ width: `${clampedPercentage}%` }}
          >
            <View>
              <WatchTimerIcon className="z-15 absolute right-0 -mr-1 -mt-1.5 " />
            </View>
            <View>
              <Text
                style={{ fontSize: getFontSize(totalSecondsRemaining) }}
                className="font-nunito-bold z-20 my-auto ml-auto text-end font-bold tracking-tight text-black"
              >
                {paddedTime(totalSecondsRemaining)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CountdownTimerDecoy;

const calculateColor = (percentage: number) => {
  if (percentage >= 0.5) {
    return "bg-[#6949FF]";
  } else if (percentage >= 0.25) {
    return "bg-[#FACC15]";
  } else {
    return "bg-[#F75555]";
  }
};
