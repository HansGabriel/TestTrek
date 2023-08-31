import * as React from "react";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  type SvgProps,
} from "react-native-svg";

import type { FC } from "react";

const TestIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={35} height={40} viewBox="0 0 35 40" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.351 28.78h10.773c.812 0 1.485-.68 1.485-1.5s-.673-1.48-1.485-1.48H11.352c-.812 0-1.486.66-1.486 1.48s.674 1.5 1.486 1.5zm6.694-12.98H11.35c-.811 0-1.485.68-1.485 1.5s.674 1.48 1.486 1.48h6.693c.811 0 1.485-.66 1.485-1.48s-.674-1.5-1.485-1.5zm14.131-1.749c.466-.005.972-.011 1.433-.011.495 0 .891.4.891.9v16.08c0 4.96-3.98 8.98-8.891 8.98H9.847C4.698 40 .5 35.78.5 30.58V9.02C.5 4.06 4.5 0 9.43 0h10.575c.515 0 .91.42.91.92v6.44c0 3.66 2.99 6.66 6.615 6.68.846 0 1.592.006 2.245.012.508.004.96.008 1.359.008.282 0 .647-.004 1.042-.009zm.546-2.919c-1.628.006-3.546 0-4.927-.014-2.19 0-3.994-1.822-3.994-4.034V1.812c0-.862 1.036-1.29 1.628-.668a51053.244 51053.244 0 017.972 8.374c.579.606.155 1.612-.679 1.614z"
        fill="url(#paint0_linear_2595_6936)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2595_6936"
          x1={34.5}
          y1={40}
          x2={-6.8467}
          y2={29.8101}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#6949FF" />
          <Stop offset={1} stopColor="#876DFF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default TestIcon;
