import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

import type { FC } from "react";

const ChevronRightIcon: FC<SvgProps> = (props) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M6.64107 16.2749C6.41918 16.0531 6.39901 15.7058 6.58055 15.4612L6.64107 15.3911L12.0322 9.99967L6.64107 4.60828C6.41918 4.38639 6.39901 4.03917 6.58055 3.7945L6.64107 3.7244C6.86295 3.50251 7.21017 3.48234 7.45485 3.66388L7.52495 3.7244L13.3583 9.55773C13.5802 9.77962 13.6003 10.1268 13.4188 10.3715L13.3583 10.4416L7.52495 16.2749C7.28087 16.519 6.88514 16.519 6.64107 16.2749Z"
      fill="#212121"
    />
  </Svg>
);
export default ChevronRightIcon;
