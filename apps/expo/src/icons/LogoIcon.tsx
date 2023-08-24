import React, { FC } from "react";
import Svg, { Rect, Path, type SvgProps } from "react-native-svg";

interface LogoProps extends SvgProps {
  type?: string;
  component?: string;
}

const Logo: FC<LogoProps> = (props) => (
  <Svg width={28} height={28} fill="none" viewBox="0 0 28 28" {...props}>
    <Rect width={28} height={28} fill="#6949FF" rx={14} />
    <Path
      fill="#fff"
      d="M19.035 21.011a1.39 1.39 0 0 1-.25.212A8.662 8.662 0 0 1 5.47 15.542a8.67 8.67 0 0 1 5.981-9.826 8.661 8.661 0 0 1 10.465 4.77 8.67 8.67 0 0 1 .693 4.452c-.104.951-1.098 1.457-2.01 1.167-.911-.291-1.383-1.277-1.407-2.234a5.201 5.201 0 0 0-3.04-4.603 5.196 5.196 0 0 0-7.272 5.657 5.2 5.2 0 0 0 7.369 3.761l-5.223-5.225a3.465 3.465 0 0 1 4.9 0l6.74 6.741a3.465 3.465 0 0 1-3.632.81Z"
    />
  </Svg>
);
export default Logo;
