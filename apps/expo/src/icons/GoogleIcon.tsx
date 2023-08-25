import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, type SvgProps } from "react-native-svg";

import type { FC } from "react";

const GoogleIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...props}>
      <G clipPath="url(#clip0_2447_12891)">
        <Path
          d="M24.008 12.225c0-.984-.078-1.701-.248-2.445H12.73v4.438h6.474c-.13 1.103-.835 2.764-2.402 3.88l-.022.148 3.488 2.75.241.025c2.22-2.086 3.499-5.156 3.499-8.796z"
          fill="#4285F4"
        />
        <Path
          d="M12.73 23.917c3.172 0 5.834-1.063 7.78-2.896l-3.708-2.924c-.992.705-2.323 1.196-4.072 1.196-3.107 0-5.744-2.086-6.684-4.97l-.138.013-3.626 2.856-.048.135c1.932 3.906 5.9 6.59 10.496 6.59z"
          fill="#34A853"
        />
        <Path
          d="M6.046 14.324a7.482 7.482 0 01-.391-2.365c0-.824.143-1.621.378-2.366l-.006-.158-3.672-2.903-.12.058A12.145 12.145 0 00.98 11.96c0 1.926.457 3.747 1.254 5.368l3.811-3.003z"
          fill="#FBBC05"
        />
        <Path
          d="M12.73 4.624c2.206 0 3.694.97 4.542 1.78l3.316-3.295C18.55 1.183 15.9 0 12.729 0 8.136 0 4.166 2.684 2.235 6.59l3.799 3.004c.953-2.884 3.59-4.97 6.696-4.97z"
          fill="#EB4335"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2447_12891">
          <Path fill="#fff" transform="translate(.98)" d="M0 0H23.04V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default GoogleIcon;
