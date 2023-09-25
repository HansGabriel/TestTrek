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
  ViewAll: {
    fetchedData:
      | "discoverTests"
      | "trendingTests"
      | "topPicksTest"
      | "topCollections"
      | "topTrekers";
  };
  CreateQuestion: undefined;
  Profile: undefined;
  Settings: undefined;
  TestDetails: {
    testId: string;
  };
  CollectionDetails: {
    collectionId: string;
  };
  EditTest: {
    testId: string;
  };
  AddCoverImage: {
    query: string;
    type: "test" | "question";
  };
  MyStatistics: undefined;
  EditPersonalInfo: undefined;
  PlayTest: {
    testId: string;
  };
  Scoreboard: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
