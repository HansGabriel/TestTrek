import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider } from "./utils/trpc";
import { RootSiblingParent } from "react-native-root-siblings";

import { ClerkProvider } from "@clerk/clerk-expo";
import Navigation from "./navigation";
import { tokenCache } from "./utils/cache";
import Constants from "expo-constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { toastConfig } from "./components/notifications/toastConfig";

export const App = () => {
  return (
    <RootSiblingParent>
      <GestureHandlerRootView className="flex-1">
        <SafeAreaProvider>
          <ClerkProvider
            publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
            tokenCache={tokenCache}
          >
            <TRPCProvider>
              <SafeAreaProvider>
                <Navigation />
                <StatusBar />
                <Toast position="top" config={toastConfig} />
              </SafeAreaProvider>
            </TRPCProvider>
          </ClerkProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </RootSiblingParent>
  );
};
