import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

import type { FC } from "react";

const CheckboxIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.392.667h7.225c2.825 0 4.717 1.983 4.717 4.933v6.809c0 2.94-1.892 4.924-4.717 4.924H5.392c-2.825 0-4.725-1.983-4.725-4.924v-6.81c0-2.95 1.9-4.932 4.725-4.932zm3.133 10.825l3.959-3.959a.734.734 0 000-1.033.734.734 0 00-1.034 0L8.01 9.94 6.55 8.483a.734.734 0 00-1.033 0 .734.734 0 000 1.034L7.5 11.492a.712.712 0 00.509.208.717.717 0 00.516-.208z"
        fill="#fff"
      />
    </Svg>
  );
};

export default CheckboxIcon;
