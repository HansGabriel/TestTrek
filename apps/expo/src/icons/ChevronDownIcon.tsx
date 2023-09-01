import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

import type { FC } from "react";

const ChevronDownIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M2.98 5.313a.5.5 0 01.65-.048l.057.048L8 9.626l4.313-4.313a.5.5 0 01.65-.048l.057.048a.5.5 0 01.048.651l-.048.057-4.667 4.666a.5.5 0 01-.65.049l-.057-.049L2.98 6.021a.5.5 0 010-.708z"
        fill="#6949FF"
      />
    </Svg>
  );
};

export default ChevronDownIcon;
