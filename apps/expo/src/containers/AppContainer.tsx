import Footer from "../components/Footer";
import { useUser } from "@clerk/clerk-expo";

import type { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const AppContainer: FC<Props> = ({ children }) => {
  const { isSignedIn } = useUser();

  return (
    <>
      {children}
      {isSignedIn && <Footer />}
    </>
  );
};
export default AppContainer;
