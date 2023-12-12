import * as React from "react";
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Mask,
  Path,
  Stop,
  type SvgProps,
} from "react-native-svg";

import type { FC } from "react";

const SilverBadge: FC<SvgProps> = (props) => {
  return (
    <Svg width={23} height={30} viewBox="0 0 137 148" fill="none" {...props}>
      <G filter="url(#filter0_d_3_49)">
        <Path
          d="M51.1867 98.7451L67.6715 108.263L34.1961 166.244L24.588 144.815L51.1867 98.7451Z"
          fill="#418ED6"
        />
        <Path
          d="M51.1867 98.7451L34.7019 89.2276L1.22654 147.209L24.588 144.815L51.1867 98.7451Z"
          fill="#2B63A6"
        />
        <Path
          d="M74.7048 98.7451L58.22 108.263L91.6954 166.244L101.303 144.815L74.7048 98.7451Z"
          fill="#2B63A6"
        />
        <Path
          d="M74.7048 98.7451L91.1896 89.2276L124.665 147.209L101.303 144.815L74.7048 98.7451Z"
          fill="#418ED6"
        />
        <Circle
          cx={62.9191}
          cy={58.8229}
          r={57.2539}
          fill="#E3E3E3"
          stroke="#404040"
        />
        <Circle cx={62.9191} cy={58.8229} r={44.3016} fill="#595959" />
        <Mask
          id="mask0_3_49"
          maskUnits="userSpaceOnUse"
          x={20}
          y={19}
          width={90}
          height={89}
        >
          <Circle cx={65.2839} cy={63.5524} r={44.4047} fill="#C28B37" />
        </Mask>
        <G mask="url(#mask0_3_49)">
          <Circle
            cx={62.9191}
            cy={58.8229}
            r={44.4047}
            fill="url(#paint0_linear_3_49)"
          />
        </G>
        <Path
          d="M63.1586 27.9315L72.7374 47.0889L91.8948 49.4836L78.74 64.2348L82.3161 85.4038L63.1586 75.8251L44.0012 85.4038L47.6092 64.2348L34.4225 49.4836L53.5799 47.0889L63.1586 27.9315Z"
          fill="url(#paint1_linear_3_49)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_3_49"
          x1={62.9191}
          y1={14.4182}
          x2={62.9191}
          y2={103.228}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9CA1A3" />
          <Stop offset={1} stopColor="#9CA1A3" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_3_49"
          x1={63.1586}
          y1={27.9315}
          x2={63.1586}
          y2={85.4038}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F1F5F5" />
          <Stop offset={0.0001} stopColor="white" />
          <Stop offset={1} stopColor="#F1F5F5" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SilverBadge;
