import * as React from "react";
import Svg, {
  Path,
  Defs,
  RadialGradient,
  Stop,
  type SvgProps,
} from "react-native-svg";

import type { FC } from "react";

const FireIcon: FC<SvgProps> = (props) => {
  return (
    <Svg width={22} height={27} viewBox="0 0 22 27" fill="none" {...props}>
      <Path
        d="M4.573 8.202c-.124 1.33-.212 3.684.573 4.686 0 0-.37-2.586 2.945-5.83 1.334-1.306 1.643-3.082 1.177-4.414C9.003 1.889 8.52 1.266 8.1.83a.391.391 0 01.3-.663c2.156.097 5.652.696 7.137 4.424.652 1.636.7 3.327.39 5.046-.197 1.098-.897 3.54.7 3.84 1.14.213 1.69-.692 1.938-1.344a.389.389 0 01.651-.122c1.925 2.19 2.09 4.768 1.691 6.989-.77 4.291-5.116 7.415-9.434 7.415-5.395 0-9.689-3.086-10.802-8.673-.449-2.256-.221-6.718 3.257-9.868.258-.236.68-.026.645.328z"
        fill="url(#paint0_radial_3131_1615)"
      />
      <Path
        d="M13.444 16.228c-1.988-2.559-1.098-5.48-.61-6.643.065-.153-.11-.298-.247-.204-.856.582-2.608 1.952-3.424 3.879-1.104 2.605-1.026 3.88-.372 5.438.394.939-.063 1.137-.293 1.172-.223.035-.429-.113-.593-.268a3.52 3.52 0 01-.97-1.663c-.036-.136-.213-.173-.294-.061-.612.846-.93 2.205-.945 3.165-.048 2.969 2.404 5.375 5.37 5.375 3.739 0 6.462-4.135 4.314-7.59-.623-1.007-1.21-1.666-1.936-2.6z"
        fill="url(#paint1_radial_3131_1615)"
      />
      <Defs>
        <RadialGradient
          id="paint0_radial_3131_1615"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(-179.751 5.23 13.23) scale(15.4411 25.3357)"
        >
          <Stop offset={0.314} stopColor="#FF9800" />
          <Stop offset={0.662} stopColor="#FF6D00" />
          <Stop offset={0.972} stopColor="#F44336" />
        </RadialGradient>
        <RadialGradient
          id="paint1_radial_3131_1615"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(90.579 .133 11.138) scale(16.1561 12.1587)"
        >
          <Stop offset={0.214} stopColor="#FFF176" />
          <Stop offset={0.328} stopColor="#FFF27D" />
          <Stop offset={0.487} stopColor="#FFF48F" />
          <Stop offset={0.672} stopColor="#FFF7AD" />
          <Stop offset={0.793} stopColor="#FFF9C4" />
          <Stop offset={0.822} stopColor="#FFF8BD" stopOpacity={0.804} />
          <Stop offset={0.863} stopColor="#FFF6AB" stopOpacity={0.529} />
          <Stop offset={0.91} stopColor="#FFF38D" stopOpacity={0.209} />
          <Stop offset={0.941} stopColor="#FFF176" stopOpacity={0} />
        </RadialGradient>
      </Defs>
    </Svg>
  );
};

export default FireIcon;
