import * as React from "react";
import Svg, { Mask, Path, G, type SvgProps } from "react-native-svg";
import type { FC } from "react";

const SettingsIcon: FC<SvgProps> = (props) => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
    <Mask
      id="mask0_2679_11381"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={2}
      y={2}
      width={25}
      height={27}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33301 2.33301H24.832V26.5075H2.33301V2.33301Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0_2679_11381)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.40238 20.3463C8.66955 20.3463 8.93671 20.3802 9.19805 20.4502C9.98671 20.6625 10.6715 21.1898 11.0775 21.898C11.3412 22.3425 11.487 22.8617 11.4917 23.3913C11.4917 24.1497 12.1007 24.7575 12.8497 24.7575H14.3115C15.057 24.7575 15.666 24.1532 15.6695 23.4077C15.6649 22.584 15.9869 21.8012 16.576 21.212C17.157 20.631 17.969 20.2822 18.781 20.3055C19.313 20.3183 19.8252 20.4618 20.2767 20.7185C20.9265 21.0907 21.756 20.869 22.1317 20.2273L22.9064 18.9358C23.0791 18.6383 23.1292 18.265 23.037 17.9208C22.946 17.5767 22.7174 17.278 22.4094 17.1018C21.6884 16.6865 21.1739 16.0168 20.9604 15.2142C20.7492 14.4267 20.8647 13.5668 21.2765 12.8587C21.5449 12.392 21.938 11.9988 22.4094 11.7282C23.0417 11.3583 23.2634 10.5312 22.8959 9.88717C22.8807 9.86151 22.8667 9.83467 22.855 9.80667L22.1714 8.62134C21.7992 7.97384 20.9709 7.75101 20.321 8.12084C19.6187 8.53617 18.7834 8.65517 17.9807 8.44401C17.1792 8.23634 16.5072 7.72884 16.0884 7.01251C15.82 6.56451 15.6742 6.04301 15.6695 5.51217C15.68 5.11317 15.54 4.75501 15.2857 4.49251C15.0325 4.23117 14.6767 4.08301 14.3115 4.08301H12.8497C12.488 4.08301 12.1497 4.22417 11.8942 4.47851C11.6399 4.73401 11.501 5.07351 11.5034 5.43517C11.4789 7.14084 10.0847 8.51401 8.39655 8.51401C7.85521 8.50817 7.33371 8.36234 6.88105 8.09167C6.24521 7.73001 5.41455 7.95284 5.04238 8.60034L4.25255 9.89884C3.89088 10.5265 4.11255 11.356 4.75655 11.7305C5.71205 12.2835 6.30821 13.3148 6.30821 14.4208C6.30821 15.5268 5.71205 16.557 4.75421 17.1112C4.11371 17.4822 3.89205 18.307 4.26305 18.9487L4.99921 20.218C5.18121 20.5458 5.47871 20.7827 5.82288 20.8795C6.16588 20.9752 6.54388 20.9343 6.85888 20.7593C7.32205 20.4875 7.86105 20.3463 8.40238 20.3463ZM14.3115 26.5075H12.8497C11.1359 26.5075 9.74171 25.1145 9.74171 23.4007C9.73938 23.1895 9.67871 22.9702 9.56555 22.78C9.38238 22.4603 9.08605 22.2317 8.74421 22.1407C8.40471 22.0497 8.03255 22.0998 7.72688 22.2772C6.99421 22.6855 6.13205 22.7847 5.34338 22.563C4.55588 22.3402 3.87571 21.7988 3.47671 21.0813L2.74755 19.8248C1.89471 18.3455 2.40221 16.4497 3.87921 15.5957C4.29805 15.3542 4.55821 14.9038 4.55821 14.4208C4.55821 13.9378 4.29805 13.4863 3.87921 13.2448C2.40105 12.3862 1.89471 10.4857 2.74638 9.00634L3.53738 7.70784C4.37855 6.24484 6.28021 5.72917 7.76305 6.58084C7.96488 6.70101 8.18421 6.76167 8.40705 6.76401C9.13388 6.76401 9.74171 6.16434 9.75338 5.42701C9.74871 4.61384 10.0695 3.83334 10.654 3.24417C11.2409 2.65617 12.0202 2.33301 12.8497 2.33301H14.3115C15.1469 2.33301 15.9589 2.67601 16.541 3.27217C17.122 3.87184 17.4429 4.69434 17.4184 5.52851C17.4207 5.71634 17.4825 5.93334 17.5945 6.12351C17.78 6.43851 18.0729 6.66017 18.4205 6.75117C18.7682 6.83751 19.1322 6.79084 19.4414 6.60767C20.9347 5.75484 22.8352 6.26584 23.688 7.74751L24.4149 9.00634C24.4335 9.04017 24.4499 9.07284 24.4639 9.10667C25.2362 10.5662 24.7205 12.4037 23.2855 13.2425C23.0767 13.3627 22.9075 13.5307 22.7909 13.7337C22.6101 14.0475 22.5599 14.4208 22.6509 14.7638C22.7442 15.1138 22.9671 15.4043 23.2809 15.584C23.989 15.9912 24.5175 16.6772 24.7287 17.4693C24.9399 18.2603 24.8244 19.119 24.4125 19.8272L23.6379 21.1175C22.785 22.5828 20.8845 23.0903 19.4064 22.2363C19.2092 22.1232 18.9817 22.0613 18.7554 22.0555H18.7484C18.4112 22.0555 18.0647 22.199 17.8127 22.4498C17.5572 22.7053 17.4172 23.046 17.4195 23.4077C17.4114 25.1215 16.0172 26.5075 14.3115 26.5075Z"
        fill="#212121"
      />
    </G>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5861 12.2197C12.3727 12.2197 11.3857 13.2079 11.3857 14.4212C11.3857 15.6346 12.3727 16.6204 13.5861 16.6204C14.7994 16.6204 15.7864 15.6346 15.7864 14.4212C15.7864 13.2079 14.7994 12.2197 13.5861 12.2197ZM13.5861 18.3704C11.4079 18.3704 9.63574 16.5994 9.63574 14.4212C9.63574 12.2431 11.4079 10.4697 13.5861 10.4697C15.7642 10.4697 17.5364 12.2431 17.5364 14.4212C17.5364 16.5994 15.7642 18.3704 13.5861 18.3704Z"
      fill="#212121"
    />
  </Svg>
);
export default SettingsIcon;