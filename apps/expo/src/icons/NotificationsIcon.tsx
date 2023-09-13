import * as React from "react";
import Svg, { Mask, Path, G, type SvgProps } from "react-native-svg";

import type { FC } from "react";

const NotificationsIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={3}
        y={1}
        width={25}
        height={21}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.5 1.167h21.58v20.239H3.5V1.166z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.288 2.917c-4.077 0-6.92 3.194-6.92 6.06 0 2.426-.672 3.547-1.267 4.537-.478.794-.854 1.422-.854 2.785.194 2.2 1.647 3.357 9.041 3.357 7.354 0 8.852-1.207 9.045-3.432-.003-1.288-.38-1.916-.857-2.71-.595-.99-1.268-2.111-1.268-4.537 0-2.866-2.842-6.06-6.92-6.06m0 18.489c-5.455 0-10.385-.385-10.788-5.032-.003-1.922.583-2.9 1.101-3.761.524-.873 1.018-1.695 1.018-3.636 0-3.771 3.483-7.81 8.67-7.81 5.185 0 8.669 4.039 8.669 7.81 0 1.94.493 2.763 1.017 3.636.518.86 1.105 1.838 1.105 3.686-.407 4.722-5.336 5.107-10.792 5.107"
          fill="#212121"
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.231 26.25h-.002c-1.308-.001-2.546-.578-3.485-1.624a.873.873 0 111.3-1.169c.605.673 1.381 1.043 2.186 1.043h.001c.809 0 1.588-.37 2.193-1.044a.876.876 0 011.301 1.171c-.942 1.047-2.183 1.623-3.494 1.623"
        fill="#212121"
      />
    </Svg>
  );
};

export default NotificationsIcon;
