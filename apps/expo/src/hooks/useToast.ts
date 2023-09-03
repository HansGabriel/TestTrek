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
      textColor: "#12D18E",
      textStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
      shadowColor: "#9E9E9E",
      backgroundColor: "#fff",
      opacity: 1,
    });
  };

  return { showToast };
};

export default useToast;
