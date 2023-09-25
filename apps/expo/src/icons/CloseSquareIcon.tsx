import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

import type { FC } from "react";

const CloseSquareIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.391 1.666h7.225c2.825 0 4.717 1.983 4.717 4.933v6.81c0 2.941-1.892 4.924-4.717 4.924H6.391c-2.825 0-4.725-1.983-4.725-4.924v-6.81c0-2.95 1.9-4.933 4.725-4.933zm6.117 10.833a.723.723 0 000-1.024l-1.484-1.483 1.484-1.484a.733.733 0 000-1.033.733.733 0 00-1.034 0L10 8.958 8.516 7.475a.733.733 0 00-1.033 0 .733.733 0 000 1.033l1.483 1.484-1.483 1.475a.733.733 0 00.516 1.25.726.726 0 00.517-.218l1.483-1.474 1.484 1.474c.141.151.325.218.508.218a.726.726 0 00.517-.218z"
        fill="#fff"
      />
    </Svg>
  );
};

export default CloseSquareIcon;
