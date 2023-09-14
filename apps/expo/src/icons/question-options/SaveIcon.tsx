import * as React from "react";
import Svg, { Path, Mask, G, type SvgProps } from "react-native-svg";

import type { FC } from "react";

const SaveIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={2}
        y={1}
        width={17}
        height={18}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.5 1.676h14.21v16.545H2.5V1.676z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.31 2.926a2.572 2.572 0 00-2.56 2.498v8.932a2.553 2.553 0 002.492 2.615h6.736a2.58 2.58 0 002.482-2.61V6.95l-3.862-4.024H6.311zm.01 15.295h-.104A3.802 3.802 0 012.5 14.343V5.409c.05-2.068 1.756-3.733 3.807-3.733h5.556c.17 0 .333.07.451.192l4.222 4.397c.11.116.173.272.173.433v7.658A3.828 3.828 0 0113 18.221H6.32z"
          fill="#212121"
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.081 7.487h-2.294a2.776 2.776 0 01-2.766-2.77V2.291a.625.625 0 011.25 0v2.424c0 .837.68 1.518 1.517 1.521h2.293a.625.625 0 010 1.25M9.285 13.917a.625.625 0 01-.625-.625V8.258a.625.625 0 011.25 0v5.034c0 .345-.28.625-.625.625"
        fill="#212121"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.285 13.916a.621.621 0 01-.443-.184L6.888 11.77a.626.626 0 01.886-.882l1.51 1.518 1.511-1.518a.625.625 0 01.886.882l-1.954 1.962a.621.621 0 01-.442.184"
        fill="#212121"
      />
    </Svg>
  );
};

export default SaveIcon;
