import React, { FC } from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

const HomeIndicator: FC<SvgProps> = (props) => (
  <Svg width={134} height={5} fill="none" viewBox="0 0 134 5" {...props}>
    <Path
      fill="#E0E0E0"
      fillRule="evenodd"
      d="M0 2.5A2.5 2.5 0 0 1 2.5 0h129a2.5 2.5 0 1 1 0 5H2.5A2.5 2.5 0 0 1 0 2.5Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default HomeIndicator;
