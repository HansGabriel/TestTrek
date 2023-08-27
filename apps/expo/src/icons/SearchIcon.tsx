import * as React from "react";
import Svg, { Mask, Path, G, type SvgProps } from "react-native-svg";

import type { FC } from "react";

const SearchIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={2}
        y={2}
        width={24}
        height={24}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.333 2.333h22.723v22.724H2.333V2.332z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.695 4.083c-5.3 0-9.612 4.311-9.612 9.611 0 5.3 4.312 9.612 9.612 9.612s9.611-4.312 9.611-9.612-4.312-9.61-9.61-9.61m0 20.972c-6.266 0-11.363-5.097-11.363-11.362S7.43 2.334 13.695 2.334s11.361 5.095 11.361 11.36-5.096 11.362-11.36 11.362"
          fill="#212121"
        />
      </G>
      <Mask
        id="b"
        maskUnits="userSpaceOnUse"
        x={20}
        y={20}
        width={6}
        height={7}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.113 20.658h5.862v5.85h-5.862v-5.85z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#b)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.1 26.509a.875.875 0 01-.618-.256l-4.112-4.1a.875.875 0 011.237-1.24l4.111 4.101a.874.874 0 01-.618 1.495"
          fill="#212121"
        />
      </G>
    </Svg>
  );
};

export default SearchIcon;
