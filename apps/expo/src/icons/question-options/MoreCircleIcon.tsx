import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

import type { FC } from "react";

const MoreCircleIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 4.083c-5.468 0-9.917 4.449-9.917 9.917S8.532 23.917 14 23.917s9.916-4.449 9.916-9.917S19.468 4.084 14 4.084m0 21.583C7.567 25.667 2.333 20.433 2.333 14S7.567 2.334 14 2.334 25.666 7.567 25.666 14c0 6.433-5.233 11.667-11.666 11.667"
        fill="#212121"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.606 15.183a1.17 1.17 0 01-1.172-1.167c0-.645.516-1.166 1.16-1.166h.012a1.166 1.166 0 110 2.333M13.928 15.183a1.17 1.17 0 01-1.171-1.167 1.16 1.16 0 011.16-1.166h.011a1.166 1.166 0 110 2.333M9.25 15.183a1.17 1.17 0 01-1.172-1.167c0-.645.517-1.166 1.162-1.166h.01a1.166 1.166 0 110 2.333"
        fill="#212121"
      />
    </Svg>
  );
};

export default MoreCircleIcon;
