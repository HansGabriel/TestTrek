import * as React from "react";
import Svg, {
  Path,
  type SvgProps,
  G,
  Circle,
  Defs,
  LinearGradient,
  Mask,
  Stop,
} from "react-native-svg";

import type { FC } from "react";

const BronzeBadgeLarge: FC<SvgProps> = (props) => {
  return (
    <Svg width={69} height={90} viewBox="0 0 137 148" fill="none" {...props}>
      <G filter="url(#filter0_d_3_48)">
        <Path
          d="M51.459 98.7451L67.9438 108.263L34.4685 166.244L24.8604 144.815L51.459 98.7451Z"
          fill="#AA75CB"
        />
        <Path
          d="M51.459 98.7451L34.9743 89.2276L1.49891 147.209L24.8604 144.815L51.459 98.7451Z"
          fill="#73488D"
        />
        <Path
          d="M74.9771 98.7451L58.4923 108.263L91.9677 166.244L101.576 144.815L74.9771 98.7451Z"
          fill="#73488D"
        />
        <Path
          d="M74.9771 98.7451L91.4619 89.2276L124.937 147.209L101.576 144.815L74.9771 98.7451Z"
          fill="#AA75CB"
        />
        <Circle
          cx={63.1915}
          cy={58.8229}
          r={57.2539}
          fill="#DC9E42"
          stroke="#774700"
        />
        <Circle cx={63.1915} cy={58.8229} r={44.3016} fill="#734C12" />
        <Mask
          id="mask0_3_48"
          maskUnits="userSpaceOnUse"
          x={21}
          y={19}
          width={89}
          height={89}
        >
          <Circle cx={65.5562} cy={63.5524} r={44.4047} fill="#C28B37" />
        </Mask>
        <G mask="url(#mask0_3_48)">
          <Circle cx={63.1916} cy={58.8229} r={44.4047} fill="#A36D1D" />
        </G>
        <Path
          d="M63.4309 27.9315L73.0096 47.0889L92.1671 49.4836L79.0123 64.2348L82.5884 85.4038L63.4309 75.8251L44.2735 85.4038L47.8815 64.2348L34.6948 49.4836L53.8522 47.0889L63.4309 27.9315Z"
          fill="url(#paint0_linear_3_48)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_3_48"
          x1={63.4309}
          y1={27.9315}
          x2={63.4309}
          y2={85.4038}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FCFF80" />
          <Stop offset={0.401042} stopColor="#FDE870" />
          <Stop offset={1} stopColor="#FFC759" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default BronzeBadgeLarge;
