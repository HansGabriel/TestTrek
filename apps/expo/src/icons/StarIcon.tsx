import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";
import type { FC } from "react";

const StarIcon: FC<SvgProps> = (props) => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.7079 5.25C13.6017 5.25 13.3404 5.27917 13.2016 5.55683L11.0712 9.81633C10.7341 10.4895 10.0842 10.9573 9.33291 11.0647L4.56358 11.7518C4.24858 11.7973 4.14124 12.0307 4.10858 12.1287C4.07941 12.2232 4.03274 12.4635 4.24974 12.6712L7.69841 15.9845C8.24791 16.513 8.49758 17.2748 8.36691 18.0203L7.55491 22.6987C7.50474 22.9915 7.68791 23.1618 7.76958 23.2202C7.85591 23.2855 8.08691 23.415 8.37274 23.2657L12.6369 21.0548C13.3089 20.7083 14.1092 20.7083 14.7789 21.0548L19.0419 23.2645C19.3289 23.4127 19.5599 23.2832 19.6474 23.2202C19.7291 23.1618 19.9122 22.9915 19.8621 22.6987L19.0477 18.0203C18.9171 17.2748 19.1667 16.513 19.7162 15.9845L23.1649 12.6712C23.3831 12.4635 23.3364 12.222 23.3061 12.1287C23.2746 12.0307 23.1672 11.7973 22.8522 11.7518L18.0829 11.0647C17.3327 10.9573 16.6829 10.4895 16.3457 9.81517L14.2131 5.55683C14.0754 5.27917 13.8141 5.25 13.7079 5.25M8.10441 25.0833C7.62258 25.0833 7.14424 24.9317 6.73474 24.633C6.02774 24.115 5.68124 23.2598 5.83174 22.3988L6.64374 17.7205C6.67408 17.5467 6.61458 17.3705 6.48624 17.2468L3.03758 13.9335C2.40291 13.3257 2.17541 12.4273 2.44374 11.5932C2.71441 10.7497 3.43074 10.1465 4.31391 10.0205L9.08324 9.33333C9.26758 9.30767 9.42624 9.1945 9.50558 9.0335L11.6371 4.77283C12.0302 3.98767 12.8236 3.5 13.7079 3.5V3.5C14.5922 3.5 15.3856 3.98767 15.7787 4.77283L17.9114 9.03233C17.9919 9.1945 18.1494 9.30767 18.3326 9.33333L23.1019 10.0205C23.9851 10.1465 24.7014 10.7497 24.9721 11.5932C25.2404 12.4273 25.0117 13.3257 24.3771 13.9335L20.9284 17.2468C20.8001 17.3705 20.7417 17.5467 20.7721 17.7193L21.5852 22.3988C21.7346 23.261 21.3881 24.1162 20.6799 24.633C19.9624 25.1592 19.0279 25.2303 18.2357 24.8173L13.9739 22.6088C13.8071 22.5225 13.6076 22.5225 13.4407 22.6088L9.17891 24.8185C8.83824 24.9958 8.47074 25.0833 8.10441 25.0833"
      fill="#212121"
    />
  </Svg>
);
export default StarIcon;
