import React, { FC } from "react";
import { ActivityIndicator, Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { trpc } from "../utils/trpc";
import { Feather } from "@expo/vector-icons";
import {
  errorToast,
  successToast,
} from "../components/notifications/ToastNotifications";
import { TouchableOpacity } from "react-native-gesture-handler";

type DownloadPdfButtonProps = {
  testId: string;
  testName?: string;
};

export const SaveToPDFButton: FC<DownloadPdfButtonProps> = (props) => {
  const { mutateAsync: generatePdfMutation, isLoading: isSaving } =
    trpc.pdfKit.generatePdfByTestId.useMutation();

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
            successToast({
              title: "Success",
              message: "File saved as PDF",
            });
          })
          .catch((e) => {
            errorToast({
              title: "Error",
              message: e.message ?? "Failed to save file",
            });
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
      const result = await generatePdfMutation(props.testId);
      const base64pdf = result.pdfBuffer;
      const filename = `test-${
        props.testName ? props.testName : ""
      }${Date.now()}.pdf`;
      const localUri = FileSystem.documentDirectory + filename;

      await FileSystem.writeAsStringAsync(localUri, base64pdf, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await saveFile(localUri, filename);
    } catch (error) {
      errorToast({
        title: "Error",
        message: "Unable to generate or download PDF",
      });
    }
  };

  return (
    <TouchableOpacity onPress={downloadAndSavePdf}>
      {isSaving ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <Feather name="download" size={24} color="black" />
      )}
    </TouchableOpacity>
  );
};
