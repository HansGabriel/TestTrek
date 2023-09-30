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
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.34 4H32.68C39.46 4 44 8.76 44 15.84V32.182C44 39.24 39.46 44 32.68 44H15.34C8.56 44 4 39.24 4 32.182V15.84C4 8.76 8.56 4 15.34 4ZM22.86 29.98L32.36 20.48C33.04 19.8 33.04 18.7 32.36 18C31.68 17.32 30.56 17.32 29.88 18L21.62 26.26L18.12 22.76C17.44 22.08 16.32 22.08 15.64 22.76C14.96 23.44 14.96 24.54 15.64 25.24L20.4 29.98C20.74 30.32 21.18 30.48 21.62 30.48C22.08 30.48 22.52 30.32 22.86 29.98Z"
        fill="url(#paint0_linear_2603_12950)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2603_12950"
          x1={44}
          y1={44}
          x2={-3.59641}
          y2={30.1999}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF5A5F" />
          <Stop offset={1} stopColor="#FF8A9B" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default CheckboxIcon;
