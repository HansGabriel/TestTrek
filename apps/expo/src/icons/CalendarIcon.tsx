import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

import type { FC } from "react";

const CalendarIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.146 3.23l.001.875c3.214.252 5.337 2.442 5.34 5.8l.013 9.83c.005 3.661-2.296 5.914-5.983 5.92l-9.006.012c-3.665.005-5.994-2.302-5.998-5.974L3.5 9.978c-.005-3.38 2.043-5.564 5.257-5.86v-.874c-.002-.513.378-.899.885-.899.507-.001.887.384.888.897l.001.816 6.842-.01v-.815a.872.872 0 01.885-.9.878.878 0 01.888.897zM5.276 10.34l17.439-.024v-.408c-.05-2.507-1.308-3.822-3.566-4.018l.002.898c0 .501-.39.899-.886.899a.878.878 0 01-.888-.897l-.001-.944-6.843.009.002.943c0 .503-.38.9-.886.9A.877.877 0 018.76 6.8l-.002-.898c-2.246.225-3.489 1.545-3.485 4.074l.001.363zm12.504 5.3v.012c.011.537.45.944.98.932.518-.013.932-.457.92-.993a.967.967 0 00-.957-.931.966.966 0 00-.943.98zm.951 5.235a.99.99 0 01-.958-.99.972.972 0 01.943-.993h.012c.541 0 .98.442.98.99a.985.985 0 01-.977.993zm-5.697-5.217a.96.96 0 00.992.932.96.96 0 00.909-1.004.952.952 0 00-.958-.932.995.995 0 00-.943 1.004zm.996 5.165a.96.96 0 01-.991-.932c0-.536.413-.98.943-1.004a.951.951 0 01.957.93.96.96 0 01-.909 1.006zm-5.742-5.124a.958.958 0 00.992.932.958.958 0 00.908-1.004.95.95 0 00-.957-.932.994.994 0 00-.943 1.004zm.997 5.13a.959.959 0 01-.992-.932.995.995 0 01.943-1.004.951.951 0 01.958.932.958.958 0 01-.91 1.004z"
        fill="#6949FF"
      />
    </Svg>
  );
};

export default CalendarIcon;
