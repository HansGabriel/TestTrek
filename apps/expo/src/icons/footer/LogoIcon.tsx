import * as React from "react";
import Svg, { Rect, Path, type SvgProps } from "react-native-svg";
import type { FC } from "react";

const LogoIcon: FC<SvgProps> = (props) => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
    <Rect width={28} height={28} rx={14} fill="#6949FF" />
    <Path
      d="M19.035 21.011c-.072.078-.156.15-.25.212A8.662 8.662 0 015.47 15.542a8.67 8.67 0 015.981-9.826 8.66 8.66 0 0110.465 4.77 8.67 8.67 0 01.693 4.452c-.104.951-1.098 1.457-2.01 1.166-.911-.29-1.383-1.276-1.407-2.233a5.202 5.202 0 00-3.04-4.603 5.196 5.196 0 00-6.596 2.028 5.201 5.201 0 004.75 7.895c.68-.04 1.339-.214 1.943-.505l-5.223-5.225a3.465 3.465 0 014.9 0l6.74 6.741a3.465 3.465 0 01-3.632.81z"
      fill="#fff"
    />
  </Svg>
);
export default LogoIcon;
