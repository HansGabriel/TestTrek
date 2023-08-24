import React, { FC } from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

const IconlyLightOutlinePlus: FC<SvgProps> = (props) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill="#9E9E9E"
      fillRule="evenodd"
      d="M11.75 16.154a.75.75 0 0 1-.75-.75V8.077a.75.75 0 0 1 1.5 0v7.327a.75.75 0 0 1-.75.75Z"
      clipRule="evenodd"
    />
    <Path
      fill="#9E9E9E"
      fillRule="evenodd"
      d="M15.417 12.49H8.084a.75.75 0 1 1 0-1.5h7.333a.75.75 0 0 1 0 1.5Z"
      clipRule="evenodd"
    />
    <Path
      fill="#9E9E9E"
      fillRule="evenodd"
      d="M7.064 2.5C4.292 2.5 2.5 4.397 2.5 7.335v8.83C2.5 19.103 4.292 21 7.064 21h9.372C19.209 21 21 19.103 21 16.165v-8.83C21 4.397 19.209 2.5 16.436 2.5H7.064Zm9.372 20H7.064C3.437 22.5 1 19.954 1 16.165v-8.83C1 3.546 3.437 1 7.064 1h9.372C20.063 1 22.5 3.546 22.5 7.335v8.83c0 3.789-2.437 6.335-6.064 6.335Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default IconlyLightOutlinePlus;
