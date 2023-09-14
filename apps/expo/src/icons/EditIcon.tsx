import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

import type { FC } from "react";

const EditIcon: FC<SvgProps> = (props) => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
    <Path
      d="M15.5576 22.7591H22.9975"
      stroke="#212121"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.734 5.66872V5.66872C17.166 4.49272 14.9424 4.81006 13.7664 6.37689C13.7664 6.37689 7.91788 14.1679 5.88905 16.8711C3.86022 19.5754 5.77938 22.9261 5.77938 22.9261C5.77938 22.9261 9.56405 23.7964 11.5637 21.1306C13.5645 18.4659 19.441 10.6364 19.441 10.6364C20.617 9.06956 20.3009 6.84472 18.734 5.66872Z"
      stroke="#212121"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.2549 8.41309L17.9295 12.6726"
      stroke="#212121"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default EditIcon;
