import React, { useState } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImageAsync } from "../services/upload";
import { ImageDetails } from "@acme/schema/src/types";

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0]?.uri;
      if (imageUri) {
        setImage(imageUri);

        try {
          const uploadResult = await uploadImageAsync<ImageDetails[]>(
            imageUri,
            "testImage",
          );

          console.log(uploadResult);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
