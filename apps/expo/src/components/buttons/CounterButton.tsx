import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import type { FC } from "react";

const CounterButton: FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);

  return (
    <View>
      <Text>Count: {count}</Text>
      <TouchableOpacity onPress={increment}>
        <Text>Increment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CounterButton;
