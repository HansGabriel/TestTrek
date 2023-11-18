import * as React from "react";
import Svg, { G, Path, Defs, type SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function DoubleBarsIcon(props: SvgProps) {
  return (
    <Svg width={26} height={25} viewBox="0 0 26 25" fill="none" {...props}>
      <G filter="url(#filter0_d_3439_2845)">
        <Path
          d="M5.125 11.166a1.01 1.01 0 01-.802-.384c-.215-.255-.323-.571-.323-.95 0-.377.108-.694.323-.95a1.01 1.01 0 01.802-.382h15.75c.319 0 .586.127.801.382.216.256.324.573.324.95 0 .379-.108.695-.324.95a1.006 1.006 0 01-.801.384H5.125zm0 5.334a1.01 1.01 0 01-.802-.384c-.215-.256-.323-.572-.323-.95s.108-.694.323-.95a1.01 1.01 0 01.802-.383h15.75c.319 0 .586.127.801.383.216.256.324.572.324.95s-.108.694-.324.95a1.006 1.006 0 01-.801.384H5.125z"
          fill="#fff"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default DoubleBarsIcon;
