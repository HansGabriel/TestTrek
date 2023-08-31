import * as React from "react";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  type SvgProps,
} from "react-native-svg";

import type { FC } from "react";

const CheckboxIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={41} height={40} viewBox="0 0 41 40" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.84 0h17.34C35.96 0 40.5 4.76 40.5 11.84v16.342C40.5 35.24 35.96 40 29.18 40H11.84C5.06 40 .5 35.24.5 28.182V11.84C.5 4.76 5.06 0 11.84 0zm7.52 25.98l9.5-9.5c.68-.68.68-1.78 0-2.48-.68-.68-1.8-.68-2.48 0l-8.26 8.26-3.5-3.5c-.68-.68-1.8-.68-2.48 0-.68.68-.68 1.78 0 2.48l4.76 4.74c.34.34.78.5 1.22.5.46 0 .9-.16 1.24-.5z"
        fill="url(#paint0_linear_2595_6828)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2595_6828"
          x1={40.5}
          y1={40}
          x2={-7.09641}
          y2={26.1999}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#12D18E" />
          <Stop offset={1} stopColor="#71E3BB" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default CheckboxIcon;
