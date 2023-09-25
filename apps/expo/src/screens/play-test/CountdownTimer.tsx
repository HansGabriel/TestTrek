import { useEffect, forwardRef, useImperativeHandle } from "react";
import { View, Text } from "react-native";
import { useTimer } from "react-timer-hook";
import dayjs from "dayjs";

type Props = {
  index: number;
  timeInSeconds?: number;
  handleTimeUp?: () => void;
};

export type CountdownTimerRef = {
  pauseTimer: () => void;
};

const CountdownTimer = forwardRef<CountdownTimerRef, Props>(
  ({ index, timeInSeconds = 60, handleTimeUp }, ref) => {
    const { seconds, restart, pause } = useTimer({
      expiryTimestamp: dayjs().add(timeInSeconds, "second").toDate(),
      onExpire: () => {
        handleTimeUp?.();
      },
    });

    const remainingPercentage = seconds / timeInSeconds;

    useImperativeHandle(ref, () => ({
      pauseTimer() {
        pause();
      },
    }));

    useEffect(() => {
      restart(dayjs().add(timeInSeconds, "second").toDate());
    }, [timeInSeconds, index]);

    return (
      <View className="mt-5 flex h-4 w-full items-center justify-center gap-x-3">
        <View className="relative h-4 w-full">
          <View className="absolute left-0 top-0 h-4 w-full">
            <View className="absolute left-0 top-0 h-4 w-full rounded-[100px] bg-zinc-100" />
            <View
              className={`absolute left-0 top-0 h-4 w-full rounded-[100px] ${calculateColor(
                remainingPercentage,
              )}`}
              style={{ width: `${remainingPercentage * 100}%` }}
            >
              <Text className="font-nunito-bold my-auto ml-auto mr-3 text-end text-xs font-bold tracking-tight text-white">
                {seconds}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  },
);

export default CountdownTimer;

const calculateColor = (percentage: number) => {
  if (percentage >= 0.5) {
    return "bg-[#6949FF]";
  } else if (percentage >= 0.25) {
    return "bg-[#FACC15]";
  } else {
    return "bg-[#F75555]";
  }
};
