import { useNavigation } from "@react-navigation/native";

const useGoBack = () => {
  const navigation = useNavigation();
  return () => navigation.goBack();
};

export default useGoBack;
