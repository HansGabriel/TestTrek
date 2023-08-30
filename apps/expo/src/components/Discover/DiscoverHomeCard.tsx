import * as React from "react";
import { Image, Text, View } from "react-native";
import DiscoverHomeCardType from "../types/discoverHomeCard";
import type { FC } from "react";

const DiscoverHomeCard: FC<DiscoverHomeCardType> = (props) => {
  return (
    <View className="inline-flex h-64 w-48 items-center justify-start gap-3">
      <View className="inline-flex shrink grow basis-0 flex-col items-start justify-start rounded-2xl border-b-2 border-zinc-100 bg-white">
        <View className="relative h-36 w-48">
          <View className="absolute left-0 top-0 h-36 w-48 bg-stone-300" />
          <Image
            className="absolute left-0 top-0 h-36 w-48"
            source={props.imageSource}
          />
          <View className="absolute left-[139px] top-[102px] inline-flex h-6 w-12 items-end justify-end gap-2 rounded-md bg-violet-600 px-2.5 py-1.5">
            <Text className="text-right text-xs font-semibold tracking-tight text-white">
              {props.q}
            </Text>
          </View>
        </View>
        <View className="flex h-28 flex-col items-start justify-start gap-2 self-stretch rounded-bl-2xl rounded-br-2xl border-l border-r border-b border-zinc-100 px-4 pt-3 pb-4">
          <Text className="self-stretch text-lg font-bold leading-7 text-neutral-800">
            {props.title}
          </Text>
          <View className="inline-flex items-center justify-start gap-2 self-stretch">
            <View className="flex h-5 w-5 items-center justify-center">
              <Image
                className="h-5 w-5 rounded-full"
                source={props.userImageSource}
              />
            </View>
            <Text className="shrink grow basis-0 text-xs font-semibold tracking-tight text-neutral-700">
              {props.userName}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DiscoverHomeCard;
