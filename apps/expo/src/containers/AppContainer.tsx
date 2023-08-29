import { useUser } from "@clerk/clerk-expo";

import type { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const AppContainer: FC<Props> = ({ children }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <>{children}</>;
  }

  return <>{children}</>;
};
export default AppContainer;
