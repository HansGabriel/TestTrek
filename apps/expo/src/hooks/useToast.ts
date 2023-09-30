import Toast from "react-native-root-toast";

const useToast = () => {
  const showToast = (message: string) => {
    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
      animation: true,
      shadow: true,
      hideOnPress: true,
      delay: 0,
      containerStyle: {
        marginTop: 10,
        borderRadius: 8,
        paddingHorizontal: 40,
        paddingVertical: 16,
      },
      textColor: "#fff",
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
      opacity: 0.7,
    });
  };

  return { showToast };
};

export default useToast;
