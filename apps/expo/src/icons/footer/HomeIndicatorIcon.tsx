import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { FC } from "react";

const HomeIndicatorIcon: FC<SvgProps> = (props) => (
  <Svg width={430} height={34} viewBox="0 0 430 34" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M148 23.5C148 22.1193 149.119 21 150.5 21H279.5C280.881 21 282 22.1193 282 23.5C282 24.8807 280.881 26 279.5 26H150.5C149.119 26 148 24.8807 148 23.5Z"
      fill="#E0E0E0"
    />
  </Svg>
);
export default HomeIndicatorIcon;
