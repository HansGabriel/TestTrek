/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as React from "react";

import { SignInSignUpScreen } from "../screens/signin";
import { HomeScreen } from "../screens/home";
import { MaterialInput } from "../screens/material-input";
import { WaltkthroughScreen } from "../screens/walkthrough";
import { CreateAccountScreen } from "../screens/create-account";
import { SignupScreen } from "../screens/signup";
import { RootStackParamList } from "../types";
import { ClerkLoaded, useUser } from "@clerk/clerk-expo";
import { UploadScreen } from "../screens/upload-screen";
import { CreateReviewer } from "../screens/create-reviewer";
import { SplashScreen } from "../screens/splash-screen";
import { MyLibrary } from "../screens/my-library";

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
    // TODO: Add splash screen
    return null;
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
              name="SignInSignUp"
              component={SignInSignUpScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MaterialInput"
              component={MaterialInput}
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
            <Stack.Screen
              name="CreateReviewer"
              component={CreateReviewer}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MyLibrary"
              component={MyLibrary}
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
