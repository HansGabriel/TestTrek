import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

import type { FC } from "react";

const LeftArrowIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={20} height={17} viewBox="0 0 20 17" fill="none" {...props}>
      <Path
        d="M19.333 8.32c0 .443-.33.81-.756.867l-.119.008H.958a.875.875 0 01-.119-1.742l.119-.008h17.5c.483 0 .875.392.875.875z"
        fill="#212121"
      />
      <Path
        d="M8.634 14.729a.875.875 0 01-1.136 1.324l-.099-.084L.341 8.94a.875.875 0 01-.085-1.142L.34 7.7 7.399.67a.875.875 0 011.32 1.143l-.085.097-6.435 6.41 6.435 6.408z"
        fill="#212121"
      />
    </Svg>
  );
};

export default LeftArrowIcon;
