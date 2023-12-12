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

const GoldBadgeLarge: FC<SvgProps> = (props) => {
  return (
    <Svg width={72} height={96} viewBox="0 0 143 196" fill="none" {...props}>
      <G filter="url(#filter0_d_3_50)">
        <Path
          d="M57.7428 115.83L74.2276 125.348L40.7522 183.329L31.1441 161.901L57.7428 115.83Z"
          fill="#CE4444"
        />
        <Path
          d="M57.7428 115.83L41.258 106.313L7.78265 164.294L31.1441 161.901L57.7428 115.83Z"
          fill="#983535"
        />
        <Path
          d="M81.2608 115.83L64.776 125.348L98.2514 183.329L107.859 161.901L81.2608 115.83Z"
          fill="#983535"
        />
        <Path
          d="M81.2608 115.83L97.7456 106.313L131.221 164.294L107.859 161.901L81.2608 115.83Z"
          fill="#CE4444"
        />
        <Circle
          cx={68.9962}
          cy={75.9081}
          r={57.2539}
          fill="url(#paint0_linear_3_50)"
          stroke="#765C00"
        />
        <Circle cx={68.9962} cy={75.9081} r={44.3016} fill="#A88300" />
        <Mask
          id="mask0_3_50"
          maskUnits="userSpaceOnUse"
          x={26}
          y={36}
          width={90}
          height={90}
        >
          <Circle cx={71.361} cy={80.6376} r={44.4047} fill="#C28B37" />
        </Mask>
        <G mask="url(#mask0_3_50)">
          <Circle cx={68.9962} cy={75.9081} r={44.4047} fill="#C09525" />
        </G>
        <Path
          d="M69.2357 45.0167L78.8144 64.1741L97.9719 66.5688L84.8171 81.32L88.3931 102.489L69.2357 92.9103L50.0783 102.489L53.6862 81.32L40.4995 66.5688L59.657 64.1741L69.2357 45.0167Z"
          fill="url(#paint1_linear_3_50)"
        />
        <Path
          d="M14.1198 41.5033L20.3653 27.758L14.1198 14.0126L27.8651 20.2582L41.6105 14.0126L35.365 27.758L41.6105 41.5033L27.8651 35.2578L14.1198 41.5033Z"
          fill="white"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_3_50"
          x1={68.9962}
          y1={19.1542}
          x2={68.9962}
          y2={132.662}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFC600" />
          <Stop offset={1} stopColor="#FFDE69" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_3_50"
          x1={69.2357}
          y1={45.0167}
          x2={69.2357}
          y2={102.489}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FFFCDD" />
          <Stop offset={1} stopColor="#FFE896" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default GoldBadgeLarge;
