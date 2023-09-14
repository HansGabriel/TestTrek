import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

import type { FC } from "react";

const EyeIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 8.034c-1.109 0-2.01.902-2.01 2.01a2.01 2.01 0 004.02 0c0-1.108-.902-2.01-2.01-2.01m0 5.268a3.262 3.262 0 01-3.26-3.258A3.263 3.263 0 0110 6.784a3.264 3.264 0 013.26 3.26A3.263 3.263 0 0110 13.302"
        fill="#212121"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.975 10.044c1.55 3.424 4.161 5.46 7.025 5.46 2.864 0 5.475-2.036 7.025-5.46-1.55-3.424-4.16-5.46-7.025-5.46-2.863 0-5.475 2.036-7.025 5.46zm7.027 6.71h-.004c-3.447-.002-6.542-2.418-8.28-6.464a.626.626 0 010-.493c1.738-4.045 4.834-6.46 8.28-6.463h.005c3.446.002 6.541 2.418 8.28 6.463a.62.62 0 010 .493c-1.738 4.046-4.834 6.462-8.28 6.465h-.001z"
        fill="#212121"
      />
    </Svg>
  );
};

export default EyeIcon;
