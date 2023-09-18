import { useState } from "react";
import { View, TextInput } from "react-native";
import Feather from "react-native-vector-icons/Feather";

import type { FC } from "react";

interface Props {
  handleSearch: (query: string) => void;
}

const SearchComponent: FC<Props> = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <View className="mt-6 flex flex-row items-center justify-center">
      <View className="flex h-16 w-[382px] flex-row justify-start gap-x-2 rounded-2xl bg-neutral-100 p-5">
        <Feather name="search" size={24} color="gray" />

        <TextInput
          placeholder="Search for media online here"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={() => handleSearch(searchTerm)}
          className="flex-1 shrink grow basis-0 font-['Nunito'] text-base font-normal leading-snug tracking-tight text-black"
          placeholderTextColor={"#BDBDBD"}
        />
      </View>
    </View>
  );
};

export default SearchComponent;
