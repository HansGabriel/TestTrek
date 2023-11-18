import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

function CheckIcon(props: SvgProps) {
  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none" {...props}>
      <Path
        d="M18.71 7.71a.999.999 0 00-1.42 0l-7.45 7.46-3.13-3.14a1.02 1.02 0 10-1.42 1.47l3.84 3.84a1 1 0 001.42 0l8.16-8.16a1 1 0 000-1.47z"
        fill="#fff"
      />
    </Svg>
  );
}

export default CheckIcon;
