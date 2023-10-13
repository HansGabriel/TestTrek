import Toast from "react-native-toast-message";

interface ToastProps {
  title: string;
  message: string;
}

export const errorToast = ({ title, message }: ToastProps) => {
  return Toast.show({
    type: "error",
    text1: title,
    text2: message,
    autoHide: true,
    visibilityTime: 3000,
    position: "top",
  });
};

export const successToast = ({ title, message }: ToastProps) => {
  return Toast.show({
    type: "success",
    text1: title,
    text2: message,
    autoHide: true,
    visibilityTime: 3000,
    position: "top",
  });
};
