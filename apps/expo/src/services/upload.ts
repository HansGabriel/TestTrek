import { uploadAsync, FileSystemUploadType } from "expo-file-system";

export const uploadImageAsync = async <T>(
  imageUri: string,
  fieldName: string,
) => {
  const imageDetails = await uploadAsync(
    "http://192.168.254.102:3000/api/upload",
    imageUri,
    {
      httpMethod: "POST",
      uploadType: FileSystemUploadType.MULTIPART,
      fieldName,
    },
  );

  const result = JSON.parse(imageDetails.body) as T;

  return result;
};
