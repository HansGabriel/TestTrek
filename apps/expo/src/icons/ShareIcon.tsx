import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

import type { FC } from "react";

const ShareIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={17} height={18} viewBox="0 0 17 18" fill="none" {...props}>
      <Path
        d="M16.362 1.151a1.611 1.611 0 00-1.609-.419L1.34 4.632A1.6 1.6 0 00.186 5.9c-.118.626.295 1.42.836 1.753l4.194 2.577c.43.265.985.198 1.341-.16l4.803-4.833a.612.612 0 01.884 0 .636.636 0 010 .889l-4.811 4.833a1.103 1.103 0 00-.161 1.35l2.562 4.236c.3.503.818.788 1.384.788.067 0 .142 0 .209-.008a1.625 1.625 0 001.359-1.158L16.762 2.77a1.637 1.637 0 00-.4-1.619"
        fill="#6949FF"
      />
    </Svg>
  );
};

export default ShareIcon;
