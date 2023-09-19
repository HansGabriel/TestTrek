import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSigninSchema } from "@acme/schema/src/user";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import GoogleIcon from "../icons/GoogleIcon";
import FacebookIcon from "../icons/FacebookIcon";
import useSignin from "../hooks/useSignin";
import { Ionicons } from "@expo/vector-icons";

import type { UserSignup } from "@acme/schema/src/types";
import type { FC } from "react";
import { AppButton } from "../components/buttons/AppButton";

interface Props {
  onSubmit: (data: UserSignup) => void;
}

const SigninForm: FC<Props> = ({ onSubmit }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const signInWithGoogle = useSignin({
    strategy: "oauth_google",
  });

  const signInWithFacebook = useSignin({
    strategy: "oauth_facebook",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignup>({
    resolver: zodResolver(userSigninSchema),
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView
      contentInset={{ bottom: 100 }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      nestedScrollEnabled={true}
      contentContainerStyle={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View className="my-8 flex flex-col">
        <View className="my-2 flex flex-col">
          <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
            Email
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-primary-1 font-nunito-bold border-b py-2"
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className="text-red-500">{errors.email.message}</Text>
          )}
        </View>

        <View className="my-2 flex flex-col">
          <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
            Password
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="border-primary-1 flex flex-row items-center justify-between border-b">
                <TextInput
                  className="font-nunito-bold py-2"
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!isPasswordVisible}
                />
                <Pressable onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={isPasswordVisible ? "ios-eye" : "ios-eye-off"}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    size={24}
                    color="#6949FF"
                  />
                </Pressable>
              </View>
            )}
            name="password"
          />
          {errors.password && (
            <Text className="text-red-500">{errors.password.message}</Text>
          )}
        </View>

        <View className="mt-3 flex flex-row items-center justify-start">
          <BouncyCheckbox
            innerIconStyle={{
              borderRadius: 10,
            }}
            fillColor="#6949FF"
            unfillColor="#FFFFFF"
            iconStyle={{ borderColor: "#FFFFFF", borderRadius: 10 }}
          />
          <Text className="font-nunito-bold text-base leading-snug tracking-tight text-neutral-800">
            Remember me
          </Text>
        </View>
      </View>
      <View className="my-2 flex flex-row items-center justify-center gap-3">
        <View className="w-[43%] border border-zinc-100" />
        <Text className="font-nunito-semibold text-center text-base leading-snug tracking-tight text-zinc-600">
          or
        </Text>
        <View className="w-[43%] border border-zinc-100" />
      </View>
      <TouchableOpacity
        onPress={signInWithGoogle}
        className="mt-5 rounded-2xl border-l border-r border-t border-b-4 border-zinc-100 bg-white px-8 py-[18px]"
      >
        <View className="flex flex-row items-center justify-center gap-3">
          <GoogleIcon />
          <Text className="font-nunito-semibold text-base leading-snug tracking-tight text-neutral-800">
            Continue with Google
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={signInWithFacebook}
        className="mt-4 rounded-2xl border-l border-r border-t border-b-4 border-zinc-100 bg-white px-8 py-[18px]"
      >
        <View className="flex flex-row items-center justify-center gap-3">
          <FacebookIcon />
          <Text className="font-nunito-semibold text-base leading-snug tracking-tight text-neutral-800">
            Continue with Facebook
          </Text>
        </View>
      </TouchableOpacity>
      <View className="mt-4 w-[312px] self-center">
        <AppButton
          onPress={handleSubmit(onSubmit)}
          text="Signin"
          buttonColor="violet-600"
          borderShadowColor="indigo-800"
          borderRadius="full"
          fontStyle="bold"
          textColor="white"
          TOwidth="full"
          Vwidth="full"
        />
      </View>
    </ScrollView>
  );
};

export default SigninForm;
