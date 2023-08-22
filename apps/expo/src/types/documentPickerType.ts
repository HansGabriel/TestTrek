import { DocumentPickerAsset } from "expo-document-picker";

export interface DocumentPickerType {
  canceled: boolean;
  assets: DocumentPickerAsset[] | null;
  output?: FileList | null | undefined;
  uri: string;
  mimeType: string;
}
