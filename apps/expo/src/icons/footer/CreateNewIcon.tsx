import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { FC } from "react";

const CreateNewIcon: FC<SvgProps> = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.75 16.1543C11.336 16.1543 11 15.8183 11 15.4043V8.07727C11 7.66327 11.336 7.32727 11.75 7.32727C12.164 7.32727 12.5 7.66327 12.5 8.07727V15.4043C12.5 15.8183 12.164 16.1543 11.75 16.1543Z"
      fill="#9E9E9E"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.417 12.4902H8.08398C7.66898 12.4902 7.33398 12.1542 7.33398 11.7402C7.33398 11.3262 7.66898 10.9902 8.08398 10.9902H15.417C15.831 10.9902 16.167 11.3262 16.167 11.7402C16.167 12.1542 15.831 12.4902 15.417 12.4902Z"
      fill="#9E9E9E"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.064 2.5C4.292 2.5 2.5 4.397 2.5 7.335V16.165C2.5 19.103 4.292 21 7.064 21H16.436C19.209 21 21 19.103 21 16.165V7.335C21 4.397 19.209 2.5 16.436 2.5H7.064ZM16.436 22.5H7.064C3.437 22.5 1 19.954 1 16.165V7.335C1 3.546 3.437 1 7.064 1H16.436C20.063 1 22.5 3.546 22.5 7.335V16.165C22.5 19.954 20.063 22.5 16.436 22.5Z"
      fill="#9E9E9E"
    />
  </Svg>
);
export default CreateNewIcon;
