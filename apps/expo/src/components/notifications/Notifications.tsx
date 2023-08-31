import { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import Constants from "expo-constants";
import { useToaster, type Toast } from "react-hot-toast/headless";

import type { FC } from "react";

interface ToastProps {
  t: Toast;
  updateHeight: (height: number) => void;
  offset: number;
}

const ToastComponent = ({ t, updateHeight, offset }: ToastProps) => {
  const fadeAnim = useRef(new Animated.Value(0.5)).current;
  const posAnim = useRef(new Animated.Value(-80)).current;

  useEffect(() => {
    return Animated.timing(fadeAnim, {
      toValue: t.visible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim, t.visible]);

  useEffect(() => {
    return Animated.spring(posAnim, {
      toValue: t.visible ? offset : -80,
      useNativeDriver: false,
    }).start();
  }, [posAnim, offset, t.visible]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: t.visible ? 9999 : undefined,
        alignItems: "center",
        opacity: fadeAnim,
        transform: [
          {
            translateY: posAnim,
          },
        ],
      }}
    >
      <View
        onLayout={(event) => updateHeight(event.nativeEvent.layout.height)}
        style={{
          margin: Constants.statusBarHeight + 10,
          backgroundColor: "#000",
          width: 150,
          borderRadius: 30,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          paddingHorizontal: 12,
        }}
        key={t.id}
      >
        <Text>{t.icon} </Text>
        <Text
          style={{
            color: "#fff",
            padding: 4,
            flex: 1,
            textAlign: "center",
          }}
        >
          {t.message?.toString()}
        </Text>
      </View>
    </Animated.View>
  );
};

const Notifications: FC = () => {
  const { toasts, handlers } = useToaster();

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      {toasts.map((t) => (
        <ToastComponent
          key={t.id}
          t={t}
          updateHeight={(height) => handlers.updateHeight(t.id, height)}
          offset={handlers.calculateOffset(t, {
            reverseOrder: false,
          })}
        />
      ))}
    </View>
  );
};

export default Notifications;
