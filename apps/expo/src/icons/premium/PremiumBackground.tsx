import * as React from "react";
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  type SvgProps,
} from "react-native-svg";

function PremiumBackground(props: SvgProps) {
  return (
    <Svg
      width={430}
      height={1240}
      viewBox="0 0 430 1240"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_3520_22616)">
        <Path fill="url(#paint0_linear_3520_22616)" d="M0 0H430V1240H0z" />
        <G opacity={0.2} fill="#fff">
          <Path
            opacity={0.1}
            d="M80.998 672.918l207.466 123.488V1005.2L80.998 880.596V672.918z"
          />
          <Path
            opacity={0.2}
            d="M495.203 673.043l-207.46 123.359v208.578l207.46-124.477v-207.46z"
          />
          <Path
            opacity={0.3}
            d="M80.998 673.602l207.466-124.607L495.93 673.602v.932L288.464 799.14 80.998 674.534v-.932z"
          />
          <Path
            opacity={0.1}
            d="M34.795 849.664l86.504 51.489v87.059l-86.504-51.956v-86.592z"
          />
          <Path
            opacity={0.2}
            d="M207.5 849.717l-86.501 51.435v86.967l86.501-51.901v-86.501z"
          />
          <Path
            opacity={0.3}
            d="M34.795 849.949l86.504-51.955 86.504 51.955v.389l-86.504 51.955-86.504-51.955v-.389z"
          />
          <Path
            opacity={0.1}
            d="M-37.363 149.284l207.466 123.488v208.797L-37.363 356.962V149.284z"
          />
          <Path
            opacity={0.2}
            d="M376.842 149.409l-207.46 123.359v208.577l207.46-124.476v-207.46z"
          />
          <Path
            opacity={0.3}
            d="M-37.363 149.968L170.103 25.361l207.465 124.607v.932L170.103 275.507-37.363 150.9v-.932z"
          />
          <Path
            opacity={0.1}
            d="M-15.203 507.852L71.3 559.341v87.058l-86.504-51.955v-86.592z"
          />
          <Path
            opacity={0.2}
            d="M157.502 507.904L71 559.339v86.968l86.502-51.901v-86.502z"
          />
          <Path
            opacity={0.3}
            d="M-15.203 508.137L71.3 456.182l86.504 51.955v.389l-86.504 51.955-86.504-51.955v-.389z"
          />
          <Path
            opacity={0.1}
            d="M282.172 329.346l86.504 51.489v87.058l-86.504-51.955v-86.592z"
          />
          <Path
            opacity={0.2}
            d="M454.877 329.398l-86.502 51.435v86.968l86.502-51.901v-86.502z"
          />
          <Path
            opacity={0.3}
            d="M282.172 329.631l86.504-51.955 86.504 51.955v.389l-86.504 51.955-86.504-51.955v-.389z"
          />
        </G>
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_3520_22616"
          x1={430}
          y1={1240}
          x2={-119.123}
          y2={1184.79}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#6949FF" />
          <Stop offset={1} stopColor="#876DFF" />
        </LinearGradient>
        <ClipPath id="clip0_3520_22616">
          <Path fill="#fff" d="M0 0H430V1240H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default PremiumBackground;
