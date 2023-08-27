import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider } from "./utils/trpc";

import { ClerkProvider } from "@clerk/clerk-expo";
import Navigation from "./navigation";
import AppContainer from "./containers/AppContainer";
import { tokenCache } from "./utils/cache";
import Constants from "expo-constants";

export const App = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        <SafeAreaProvider>
          <AppContainer>
            <Navigation />
            <StatusBar />
          </AppContainer>
        </SafeAreaProvider>
      </TRPCProvider>
    </ClerkProvider>
  );
};
