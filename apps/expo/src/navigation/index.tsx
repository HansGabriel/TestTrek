/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as React from "react";

import { SigninScreen } from "../screens/signin";
import { HomeScreen } from "../screens/home";
import { WaltkthroughScreen } from "../screens/walkthrough";
import { CreateAccountScreen } from "../screens/create-account";
import { SignupScreen } from "../screens/signup";
import { RootStackParamList } from "../types";
import { ClerkLoaded, useUser } from "@clerk/clerk-expo";
import { UploadScreen } from "../screens/upload-screen";
import { CreateCollection } from "../screens/create-collection";
import { SplashScreen } from "../screens/splash-screen";
import { MyLibraryScreen } from "../screens/my-library";
import { CreateTestScreen } from "../screens/create-test";
import { DiscoverScreen } from "../screens/discover";
import { CreateQuestionScreen } from "../screens/create-question";
import { ProfileScreen } from "../screens/profile";
import { SettingsScreen } from "../screens/settings";
import { TestDetailsScreen } from "../screens/test-details";
import { EditTestScreen } from "../screens/edit-test";
import { AddCoverImageScreen } from "../screens/add-cover-image";
import { MyStatistics } from "../screens/my-statistics";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Read more about the protected routes pattern in React Native
 *
 * https://reactnavigation.org/docs/auth-flow
 */
const RootNavigator = () => {
  const { isSignedIn } = useUser();

  const [fontsLoaded] = useFonts({
    "Nunito-Black": require("../../assets/fonts/Nunito-Black.ttf"),
    "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-ExtraBold": require("../../assets/fonts/Nunito-ExtraBold.ttf"),
    "Nunito-ExtraLight": require("../../assets/fonts/Nunito-ExtraLight.ttf"),
    "Nunito-Light": require("../../assets/fonts/Nunito-Light.ttf"),
    "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("../../assets/fonts/Nunito-SemiBold.ttf"),
    "Nunito-Medium": require("../../assets/fonts/Nunito-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <ClerkLoaded>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      >
        {isSignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CreateTest"
              component={CreateTestScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MyLibrary"
              component={MyLibraryScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Discover"
              component={DiscoverScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CreateQuestion"
              component={CreateQuestionScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CreateCollection"
              component={CreateCollection}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TestDetails"
              component={TestDetailsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EditTest"
              component={EditTestScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddCoverImage"
              component={AddCoverImageScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MyStatistics"
              component={MyStatistics}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Walkthrough"
              component={WaltkthroughScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CreateAccount"
              component={CreateAccountScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signin"
              component={SigninScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="UploadScreen"
              component={UploadScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </ClerkLoaded>
  );
};
