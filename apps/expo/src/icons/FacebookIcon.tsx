import * as React from "react";
import Svg, {
  G,
  Path,
  Defs,
  ClipPath,
  LinearGradient,
  Stop,
  type SvgProps,
} from "react-native-svg";

import type { FC } from "react";

const FacebookIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <G clipPath="url(#clip0_2772_8402)">
        <Path
          d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0z"
          fill="url(#paint0_linear_2772_8402)"
        />
        <Path
          d="M13.728 16.858h3.257l.511-3.308h-3.768V11.74c0-1.374.45-2.592 1.735-2.592h2.065V6.262c-.363-.05-1.13-.156-2.58-.156-3.03 0-4.805 1.6-4.805 5.243v2.201H7.03v3.308h3.113v9.093c.617.092 1.242.155 1.883.155.58 0 1.145-.053 1.703-.128v-9.12z"
          fill="#fff"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_2772_8402"
          x1={3.5958}
          y1={3.5958}
          x2={21.969}
          y2={21.969}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2AA4F4" />
          <Stop offset={1} stopColor="#007AD9" />
        </LinearGradient>
        <ClipPath id="clip0_2772_8402">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default FacebookIcon;
