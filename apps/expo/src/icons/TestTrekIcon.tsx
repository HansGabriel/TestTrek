import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";
import type { FC } from "react";

export const TestTrekLogo: FC<SvgProps> = (props) => {
  return (
    <Svg width={625} height={625} viewBox="0 0 625 625" fill="none" {...props}>
      <Path d="M195.8 177.9l-3.3 2.9-.3 21.3c-.5 31.2-.7 30.9 23.4 30.9H232v-58h-33l-3.2 2.9zM248 204v29h173.5l14.5-14.5 14.5-14.5-14.5-14.5-14.5-14.5H248v29zm39 130.8v86.7l14.5 14.5 14.5 14.5 14.5-14.5 14.5-14.5V248h-58v86.8z" />
    </Svg>
  );
};
