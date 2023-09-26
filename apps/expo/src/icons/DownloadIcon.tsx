import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

import type { FC } from "react";

const DownloadIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={18} height={16} viewBox="0 0 18 16" fill="none" {...props}>
      <Path
        d="M8.358 4.076V.735c0-.355.283-.652.641-.652.321 0 .593.25.636.564l.006.088v3.34h3.983c1.984 0 3.613 1.625 3.705 3.65l.004.18v4.2c0 2.04-1.573 3.714-3.527 3.808l-.173.004H4.366c-1.983 0-3.605-1.616-3.696-3.65l-.004-.18v-4.19c0-2.04 1.565-3.722 3.518-3.817l.174-.004h4V9.41L7.024 8.034a.63.63 0 00-.908 0 .675.675 0 00-.183.474c0 .13.037.267.116.382l.067.082 2.425 2.513a.613.613 0 00.458.198.612.612 0 00.388-.139l.062-.059 2.425-2.513a.68.68 0 000-.938.629.629 0 00-.836-.064l-.072.064-1.325 1.377V4.076H8.358z"
        fill="#6949FF"
      />
    </Svg>
  );
};

export default DownloadIcon;
