import * as React from "react";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  type SvgProps,
} from "react-native-svg";
import type { FC } from "react";

const SelectedStarIcon: FC<SvgProps> = (props) => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
    <Path
      d="M20.905 16.707a1.284 1.284 0 00-.372 1.132l1.037 5.74a1.26 1.26 0 01-.525 1.26c-.399.291-.93.326-1.365.093l-5.167-2.695a1.319 1.319 0 00-.583-.153h-.317a.945.945 0 00-.315.105L8.13 24.897c-.255.128-.545.174-.828.128a1.297 1.297 0 01-1.039-1.482l1.039-5.74a1.306 1.306 0 00-.372-1.143l-4.213-4.083a1.26 1.26 0 01-.314-1.318 1.31 1.31 0 011.037-.875l5.798-.842a1.297 1.297 0 001.027-.71l2.555-5.238c.06-.117.139-.224.233-.315l.105-.082a.782.782 0 01.188-.152L13.473 3l.199-.082h.49c.44.045.826.308 1.027.7l2.59 5.215c.186.381.549.646.968.71l5.798.842c.49.07.9.408 1.062.875.152.467.02.98-.339 1.318l-4.363 4.13z"
      fill="url(#paint0_linear_3257_20964)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_3257_20964"
        x1={25.6694}
        y1={25.0851}
        x2={-1.86781}
        y2={16.6802}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FB9400" />
        <Stop offset={1} stopColor="#FFAB38" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SelectedStarIcon;
