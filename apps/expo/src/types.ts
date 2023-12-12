/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { UserInfo } from "@acme/schema/src/types";
import type { PartialQuestion } from "./stores/useQuestionStore";

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
  EditCollection: {
    collectionId: string;
  };
  SplashScreen: undefined;
  MaterialInput: undefined;
  MyLibrary: undefined;
  CreateTest: undefined;
  ViewAll:
    | {
        fetchedData:
          | "discoverTests"
          | "trendingTests"
          | "topPicksTest"
          | "topCollections"
          | "topTrekers"
          | "discoverReviewers";
      }
    | {
        fetchedData: "questions";
        type: "testId";
        testId: string;
      }
    | {
        fetchedData: "questions";
        type: "questions";
        questions: PartialQuestion[];
      };
  CreateQuestion: undefined;
  Profile: undefined;
  OthersProfile: { userId: string };
  Settings: undefined;
  TestDetails: {
    testId: string;
  };
  CollectionDetails: {
    collectionId: string;
  };
  ReviewerDetails: {
    reviewerId: string;
  };
  EditTest: {
    testId: string;
  };
  AddCoverImage: {
    query: string;
    type:
      | "test"
      | "question"
      | "collection"
      | "editCollection"
      | "reviewer"
      | "editReviewer";
  };
  MyStatistics: undefined;
  EditPersonalInfo: undefined;
  PlayTest: {
    playId: string;
    testId: string;
  };
  Scoreboard: {
    testId: string;
  };
  MusicAndEffects: undefined;
  AboutTestTrek: undefined;
  CreateReviewer:
    | {
        reviewerId?: string;
        type?: "create" | "edit";
      }
    | undefined;
  TestHistory: {
    historyId: string;
    testId?: string;
  };
  QuestionHistory: {
    questionId: string;
    questionIndex: number;
  };
  HistoryTest: undefined;
  Premium: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
