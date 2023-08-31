import * as React from "react";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  type SvgProps,
} from "react-native-svg";

import type { FC } from "react";

const ChatIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={49} height={48} viewBox="0 0 49 48" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 24.03C4.5 13.494 12.92 4 24.54 4 35.9 4 44.5 13.314 44.5 23.97 44.5 36.328 34.42 44 24.5 44c-3.28 0-6.92-.881-9.84-2.604-1.02-.62-1.88-1.081-2.98-.721l-4.04 1.202c-1.02.32-1.94-.48-1.64-1.563l1.34-4.486c.22-.621.18-1.282-.14-1.803-1.72-3.165-2.7-6.63-2.7-9.995zm17.4 0a2.584 2.584 0 002.56 2.584c1.42 0 2.56-1.162 2.56-2.564a2.554 2.554 0 00-2.56-2.564c-1.4-.02-2.56 1.142-2.56 2.544zm9.22.02a2.567 2.567 0 002.56 2.564c1.42 0 2.56-1.162 2.56-2.564a2.554 2.554 0 00-2.56-2.564 2.554 2.554 0 00-2.56 2.564zm-15.88 2.564a2.58 2.58 0 01-2.56-2.564 2.554 2.554 0 012.56-2.564c1.42 0 2.56 1.142 2.56 2.564 0 1.402-1.14 2.544-2.56 2.564z"
        fill="url(#paint0_linear_2595_12198)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2595_12198"
          x1={44.5}
          y1={44}
          x2={-3.09641}
          y2={30.1999}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#12D18E" />
          <Stop offset={1} stopColor="#71E3BB" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default ChatIcon;
