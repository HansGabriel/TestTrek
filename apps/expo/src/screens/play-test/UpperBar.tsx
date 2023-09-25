import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import { Text, View, ImageBackground, Animated, Pressable } from "react-native";
import { match } from "ts-pattern";

export type UpperBarRef = {
  show: () => void;
  hide: () => void;
  isVisible: boolean;
};

type Props =
  | {
      type: "correct";
      value: number;
    }
  | {
      type: "incorrect";
      message?: string;
    };

const UpperBar = forwardRef<UpperBarRef, Props>((props, ref) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const [isVisible, setIsVisible] = useState(false);

  const { type } = props;

  const showUpperBar = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
    setIsVisible(true);
    setTimeout(() => {
      hideUpperBar();
    }, 5000);
  };

  const hideUpperBar = () => {
    Animated.spring(translateY, {
      toValue: -250,
      useNativeDriver: false,
    }).start(() => setIsVisible(false));
  };

  useImperativeHandle(ref, () => ({
    show: showUpperBar,
    hide: hideUpperBar,
    isVisible,
  }));

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity: isVisible ? 1 : 0,
      }}
      className="absolute top-0 left-0 flex h-52 w-full flex-row items-center justify-between"
    >
      {isVisible && (
        <Pressable
          className="h-full w-full flex-col items-center justify-center gap-y-5"
          onPress={hideUpperBar}
        >
          <ImageBackground
            source={match(type)
              .with("correct", () =>
                require("../../../assets/images/correct-background.png"),
              )
              .with("incorrect", () =>
                require("../../../assets/images/incorrect-background.png"),
              )
              .exhaustive()}
            resizeMode="cover"
            className="h-full w-full flex-col items-center justify-center gap-y-5"
          >
            <Text className="font-nunito-bold mx-auto text-2xl font-bold leading-[38.40px] text-white">
              {match(type)
                .with("correct", () => "Correct!")
                .with("incorrect", () => "Incorrect!")
                .exhaustive()}
            </Text>
            <View className="inline-flex h-[45px] w-[177px] items-center justify-center rounded-[100px] bg-white px-6 py-2.5">
              <Text
                className={`font-nunito-bold text-center text-lg font-bold leading-[25.20px] tracking-tight ${
                  type === "correct" ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {match(props)
                  .with(
                    {
                      type: "correct",
                    },
                    (props) => `+${props.value}`,
                  )
                  .with(
                    {
                      type: "incorrect",
                    },
                    (props) => props.message ?? "That was close",
                  )
                  .exhaustive()}
              </Text>
            </View>
          </ImageBackground>
        </Pressable>
      )}
    </Animated.View>
  );
});

export default UpperBar;
