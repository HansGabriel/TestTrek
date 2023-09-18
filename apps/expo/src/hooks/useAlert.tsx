import { Alert } from "react-native";

type AlertProps = {
  title: string;
  message: string;
  exitText?: string;
  cancelText?: string;
  handleExit: () => void;
};

const alert = ({
  title,
  message,
  handleExit,
  exitText = "Exit",
  cancelText = "Cancel",
}: AlertProps) => {
  Alert.alert(title, message, [
    {
      text: cancelText,
      style: "cancel",
    },
    {
      text: exitText,
      onPress: handleExit,
    },
  ]);
};

export const alertExit = ({ handleExit }: Pick<AlertProps, "handleExit">) => {
  return alert({
    title: "Are you sure?",
    message: "You will lose all your progress if you exit this screen",
    handleExit,
  });
};
