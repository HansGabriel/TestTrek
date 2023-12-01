import React, { FC } from "react";
import { Button, Alert, Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { trpc } from "../utils/trpc";

type DownloadPdfButtonProps = {
  testId: string;
};

const DownloadPdfButton: FC<DownloadPdfButtonProps> = (props) => {
  const generatePdfMutation = trpc.pdfKit.generatePdfByTestId.useMutation();

  const saveFile = async (uri: string, filename: string) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          "testtrek/saves/pdf",
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
            Alert.alert("File Saved", "File has been saved successfully");
          })
          .catch((e) => {
            console.log(e);
            Alert.alert("Error", "Failed to save file");
          });
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  const downloadAndSavePdf = async () => {
    try {
      const result = await generatePdfMutation.mutateAsync(props.testId);
      const base64pdf = result.pdfBuffer;
      const filename = `test-${Date.now()}.pdf`;
      const localUri = FileSystem.documentDirectory + filename;

      await FileSystem.writeAsStringAsync(localUri, base64pdf, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await saveFile(localUri, filename);
    } catch (error) {
      console.error("Error saving PDF:", error);
      Alert.alert("Error", "Unable to generate or download PDF");
    }
  };

  return <Button title="Save PDF" onPress={downloadAndSavePdf} />;
};

export default DownloadPdfButton;
