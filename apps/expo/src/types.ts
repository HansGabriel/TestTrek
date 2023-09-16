/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { UserInfo } from "@acme/schema/src/types";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Walkthrough: undefined;
  CreateAccount: undefined;
  Signup: {
    userInfo: UserInfo;
  };
  Signin: undefined;
  Home: undefined;
  UploadScreen: undefined;
  CreateCollection: undefined;
  SplashScreen: undefined;
  MaterialInput: undefined;
  MyLibrary: undefined;
  CreateTest: undefined;
  Discover: undefined;
  CreateQuestion: undefined;
  Profile: undefined;
  Settings: undefined;
  TestDetails: {
    testId: string;
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
