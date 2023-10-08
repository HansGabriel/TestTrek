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
    <View className="mt-6 flex flex-row items-center justify-center self-center">
      <View className="flex h-16 w-[90%] flex-row justify-start self-center rounded-2xl bg-neutral-100 p-5">
        <View>
          <Feather name="search" size={24} color="gray" />
        </View>
        <View className="self-center ml-5">
          <TextInput
            placeholder="Search for media online here"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            onSubmitEditing={() => handleSearch(searchTerm)}
            className="font-nunito-bold text-base leading-snug tracking-tight text-black"
            placeholderTextColor={"#BDBDBD"}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchComponent;
