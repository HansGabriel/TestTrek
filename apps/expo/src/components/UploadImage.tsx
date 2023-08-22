import React, { useState } from "react";
import { Button, View, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { DocumentPickerType } from "../types/documentPickerType";

const UploadImage = () => {
  const [image, setImage] = useState<string | undefined>();

  const selectFile = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (!result.canceled) {
      const { uri, mimeType } = result as DocumentPickerType;
      if (mimeType === "image/jpeg") {
        setImage(uri);
      }
    }
  };

  return (
    <SafeAreaView>
      <View className=" mt-10 rounded-lg  p-10">
        <Button title="Upload Image" onPress={selectFile} />
      </View>
      {image && (
        <Image source={{ uri: image }} className="h-2/4 w-2/4 self-center" />
      )}
    </SafeAreaView>
  );
};

export default UploadImage;
