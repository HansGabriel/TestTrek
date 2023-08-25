import { useOAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";
import { useWarmUpBrowser } from "./useWarmUpBrowser";

import type { UseOAuthFlowParams } from "@clerk/clerk-expo";

type AuthStrategy = UseOAuthFlowParams["strategy"];

interface Props {
  strategy: AuthStrategy;
}

const useSignin = ({ strategy }: Props) => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy });

  const handleSignInWithGooglePress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  return handleSignInWithGooglePress;
};

export default useSignin;
