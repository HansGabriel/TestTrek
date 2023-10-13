import {
  BaseToast,
  ErrorToast,
  BaseToastProps,
} from "react-native-toast-message";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderRadius: 100,
        width: "90%",
        borderWidth: 5,
        borderColor: "green",
      }}
      text1Style={{
        fontFamily: "Nunito-Bold",
        fontSize: 16,
        color: "green",
      }}
      text2Style={{
        fontFamily: "Nunito-Regular",
        fontSize: 13,
      }}
      renderLeadingIcon={() => (
        <View className="ml-5 self-center">
          <AntDesign name="checkcircleo" size={30} color="green" />
        </View>
      )}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderRadius: 100,
        width: "90%",
        borderWidth: 5,
        borderColor: "red",
      }}
      text1Style={{
        fontFamily: "Nunito-Bold",
        fontSize: 16,
        color: "red",
      }}
      text2Style={{
        fontFamily: "Nunito-Regular",
        fontSize: 13,
      }}
      renderLeadingIcon={() => (
        <View className="ml-5 self-center">
          <MaterialIcons name="cancel" size={30} color="red" />
        </View>
      )}
    />
  ),
};
