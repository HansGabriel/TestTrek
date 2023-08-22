import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { DocumentPickerType } from "../types/documentPickerType";

const UploadFile = () => {
  const [docs, setDocs] = useState<string | undefined>();

  const selectFile = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (!result.canceled) {
      const { uri, mimeType } = result as DocumentPickerType;
      if (mimeType !== "image/jpeg") {
        setDocs(uri);
      }
    }
  };

  return (
    <SafeAreaView>
      <View className=" mt-10 rounded-lg  p-10">
        <Button title="Upload File" onPress={selectFile} />
        <Text> The URI of the selected file is: {docs}</Text>
      </View>
    </SafeAreaView>
  );
};

export default UploadFile;
