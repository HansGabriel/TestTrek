import { useForm, Controller } from "react-hook-form";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSigninSchema } from "@acme/schema/src/user";
import GoogleIcon from "../icons/GoogleIcon";
import FacebookIcon from "../icons/FacebookIcon";
import useSignin from "../hooks/useSignin";

import type { UserSignup } from "@acme/schema/src/types";
import type { FC } from "react";

interface Props {
  onSubmit: (data: UserSignup) => void;
}

const SigninForm: FC<Props> = ({ onSubmit }) => {
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

  return (
    <ScrollView
      contentInset={{ bottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex flex-col content-end justify-between">
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
                <TextInput
                  className="border-primary-1 font-nunito-bold border-b py-2"
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text className="text-red-500">{errors.password.message}</Text>
            )}
          </View>
        </View>
        <View className="flex flex-row items-center justify-start gap-3">
          <View className="h-[0px] w-[43%] border border-zinc-100"></View>
          <Text className="font-nunito-semibold text-center text-base leading-snug tracking-tight text-zinc-600">
            or
          </Text>
          <View className="h-[0px] w-[43%] border border-zinc-100"></View>
        </View>
        <TouchableOpacity
          onPress={signInWithGoogle}
          className="mt-10 rounded-2xl border-l border-r border-t border-b-4 border-zinc-100 bg-white px-8 py-[18px]"
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
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <View className="mt-8 flex w-full flex-row items-center justify-center rounded-[100px] border-b-2 border-indigo-700 bg-violet-600 px-4 py-[18px]">
            <Text className="font-nunito-bold shrink grow basis-0 text-center text-base leading-snug tracking-tight text-white">
              SIGN IN
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SigninForm;
