import { uploadAsync, FileSystemUploadType } from "expo-file-system";

type UploadImageAsyncProps = {
  path: string;
  imageUri: string;
  fieldName: string;
};

export const uploadImageAsync = async <T>({
  path,
  imageUri,
  fieldName,
}: UploadImageAsyncProps) => {
  const imageDetails = await uploadAsync(path, imageUri, {
    httpMethod: "POST",
    uploadType: FileSystemUploadType.MULTIPART,
    fieldName,
  });

  const result = JSON.parse(imageDetails.body) as T;

  return result;
};
