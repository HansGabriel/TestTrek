import { useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { View, Text } from "react-native";
import { useTimer } from "react-timer-hook";
import dayjs from "dayjs";
import WatchTimerIcon from "../../icons/WatchTimerIcon";

type Props = {
  index: number;
  timeInSeconds?: number;
  handleTimeUp?: () => void;
};

export type CountdownTimerRef = {
  pauseTimer: () => void;
  elapsedTime: number;
};

const CountdownTimer = forwardRef<CountdownTimerRef, Props>(
  ({ index, timeInSeconds = 60, handleTimeUp }, ref) => {
    const endTimeRef = useRef(dayjs().add(timeInSeconds, "second").toDate());

    const { seconds, minutes, restart, pause } = useTimer({
      expiryTimestamp: endTimeRef.current,
      onExpire: () => {
        handleTimeUp?.();
      },
    });

    const totalSecondsRemaining = minutes * 60 + seconds;
    const remainingPercentage =
      ((totalSecondsRemaining / timeInSeconds) * 100) / 100;
    const clampedPercentage = Math.min(
      100,
      Math.max(0, remainingPercentage * 100),
    );
    const elapsedTime = timeInSeconds - totalSecondsRemaining;

    const getFontSize = (seconds: number) => {
      const numDigits = seconds.toString().length;
      if (numDigits === 3) {
        return 8; // smaller font size for 3 digits
      }
      return 10; // default font size for 1 or 2 digits
    };

    useImperativeHandle(ref, () => ({
      pauseTimer() {
        pause();
      },
      elapsedTime,
    }));

    useEffect(() => {
      endTimeRef.current = dayjs().add(timeInSeconds, "second").toDate();
      restart(endTimeRef.current);
    }, [timeInSeconds, index]);

    const paddedTime = (seconds: number) => {
      return seconds.toString().padStart(2, "0");
    };

    return (
      <View className="mt-5 flex h-4 w-full items-center justify-center gap-x-3">
        <View className="relative h-4 w-full">
          <View className="absolute left-0 top-0 h-4 w-full">
            <View className="absolute left-0 top-0 h-4 w-full rounded-[100px] bg-zinc-100" />
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
