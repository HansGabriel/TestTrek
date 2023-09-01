import * as React from "react";
import Svg, {
  G,
  Mask,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
  type SvgProps,
} from "react-native-svg";
import type { FC } from "react";

const PlayQuizBackground: FC<SvgProps> = (props) => (
  <Svg width={382} height={170} viewBox="0 0 382 170" fill="none" {...props}>
    <G clipPath="url(#clip0_2136_29685)">
      <Mask id="a" fill="#fff">
        <Path d="M0 40C0 21.144 0 11.716 5.858 5.858 11.716 0 21.144 0 40 0h302c18.856 0 28.284 0 34.142 5.858C382 11.716 382 21.144 382 40v90c0 18.856 0 28.284-5.858 34.142C370.284 170 360.856 170 342 170H40c-18.856 0-28.284 0-34.142-5.858C0 158.284 0 148.856 0 130V40z" />
      </Mask>
      <Path
        d="M0 40C0 21.144 0 11.716 5.858 5.858 11.716 0 21.144 0 40 0h302c18.856 0 28.284 0 34.142 5.858C382 11.716 382 21.144 382 40v90c0 18.856 0 28.284-5.858 34.142C370.284 170 360.856 170 342 170H40c-18.856 0-28.284 0-34.142-5.858C0 158.284 0 148.856 0 130V40z"
        fill="url(#paint0_linear_2136_29685)"
      />
      <G opacity={0.4} fill="#fff">
        <Path
          opacity={0.1}
          d="M233.534-10.039l103.733 61.745v104.398L233.534 93.8V-10.039z"
        />
        <Path
          opacity={0.2}
          d="M440.637-9.976l-103.73 61.68v104.288l103.73-62.238V-9.976z"
        />
        <Path
          opacity={0.3}
          d="M233.534-9.697L337.267-72 441-9.697v.466L337.267 53.073 233.534-9.231v-.466z"
        />
        <Path
          opacity={0.1}
          d="M-59 49.186L44.733 110.93v104.398L-59 153.025V49.186z"
        />
        <Path
          opacity={0.2}
          d="M148.103 49.248l-103.73 61.68v104.288l103.73-62.237V49.249z"
        />
        <Path
          opacity={0.3}
          d="M-59 49.528L44.733-12.775l103.733 62.303v.466L44.733 112.297-59 49.994v-.466z"
        />
        <Path
          opacity={0.1}
          d="M190.103 15.931l43.251 25.745v43.53l-43.251-25.979V15.931z"
        />
        <Path
          opacity={0.2}
          d="M276.455 15.957l-43.251 25.718v43.484l43.251-25.95V15.956z"
        />
        <Path
          opacity={0.3}
          d="M190.103 16.074l43.251-25.978 43.252 25.978v.194l-43.252 25.978-43.251-25.978v-.194zM226.355 182.262l43.252-25.978 43.252 25.978v.194l-43.252 25.978-43.252-25.978v-.194z"
        />
      </G>
      <Path
        d="M30.82 52.16c-.413 0-.733-.113-.96-.34-.213-.24-.32-.567-.32-.98V39.2c0-.427.113-.747.34-.96.227-.227.547-.34.96-.34h4.82c1.547 0 2.74.387 3.58 1.16.84.773 1.26 1.853 1.26 3.24 0 1.387-.42 2.473-1.26 3.26-.84.773-2.033 1.16-3.58 1.16H32.1v4.12c0 .413-.107.74-.32.98-.213.227-.533.34-.96.34zm1.28-7.46h3.16c.907 0 1.593-.2 2.06-.6.467-.413.7-1.013.7-1.8 0-.787-.233-1.38-.7-1.78-.467-.4-1.153-.6-2.06-.6H32.1v4.78zm13.587 7.5c-1.107 0-1.94-.313-2.5-.94-.56-.64-.84-1.573-.84-2.8V39c0-.413.106-.727.32-.94.213-.213.52-.32.92-.32s.706.107.92.32c.227.213.34.527.34.94v9.34c0 .613.127 1.067.38 1.36.267.293.64.44 1.12.44h.3l.28-.04c.187-.027.313.027.38.16.066.12.1.373.1.76 0 .333-.067.593-.2.78-.133.187-.354.3-.66.34l-.42.04c-.147.013-.294.02-.44.02zm6.267 0c-.707 0-1.34-.133-1.9-.4a3.444 3.444 0 01-1.3-1.12 2.813 2.813 0 01-.46-1.58c0-.72.186-1.287.56-1.7.373-.427.98-.733 1.82-.92.84-.187 1.966-.28 3.38-.28h1v1.44h-.98c-.827 0-1.487.04-1.98.12-.494.08-.847.22-1.06.42-.2.187-.3.453-.3.8 0 .44.153.8.46 1.08.306.28.733.42 1.28.42.44 0 .826-.1 1.16-.3.346-.213.62-.5.82-.86.2-.36.3-.773.3-1.24v-2.3c0-.667-.147-1.147-.44-1.44-.294-.293-.787-.44-1.48-.44-.387 0-.807.047-1.26.14a6.71 6.71 0 00-1.4.48c-.254.12-.48.153-.68.1a.765.765 0 01-.44-.32 1.05 1.05 0 01-.16-.56c0-.2.053-.393.16-.58.106-.2.286-.347.54-.44a9.083 9.083 0 011.76-.54 8.596 8.596 0 011.56-.16c.96 0 1.746.147 2.36.44a2.91 2.91 0 011.4 1.34c.306.587.46 1.347.46 2.28v4.8c0 .413-.1.733-.3.96-.2.213-.487.32-.86.32-.374 0-.667-.107-.88-.32-.2-.227-.3-.547-.3-.96v-.96h.16a2.712 2.712 0 01-1.58 2c-.414.187-.887.28-1.42.28zm10.1 3.56c-.294 0-.534-.08-.72-.24a.914.914 0 01-.34-.6c-.027-.253.02-.52.14-.8l1.36-3.02v1.04l-3.64-8.42c-.12-.293-.16-.567-.12-.82a.886.886 0 01.36-.6c.213-.16.5-.24.86-.24.306 0 .553.073.74.22.186.133.353.393.5.78l2.7 6.74h-.6l2.76-6.76c.146-.373.32-.627.52-.76.2-.147.466-.22.8-.22.293 0 .526.08.7.24.173.147.28.347.32.6.04.24-.007.507-.14.8l-4.86 11.1c-.174.373-.36.627-.56.76-.2.133-.46.2-.78.2zM80.01 52.2c-.866 0-1.593-.147-2.18-.44-.573-.293-1-.72-1.28-1.28-.28-.573-.42-1.28-.42-2.12V44.1h-1.04c-.32 0-.566-.08-.74-.24-.173-.173-.26-.407-.26-.7 0-.307.087-.54.26-.7.174-.16.42-.24.74-.24h1.04V40.4c0-.413.107-.727.32-.94.227-.213.54-.32.94-.32.4 0 .707.107.92.32.214.213.32.527.32.94v1.82h2.12c.32 0 .567.08.74.24.174.16.26.393.26.7 0 .293-.086.527-.26.7-.173.16-.42.24-.74.24h-2.12v4.12c0 .64.14 1.12.42 1.44.28.32.734.48 1.36.48.227 0 .427-.02.6-.06.174-.04.327-.067.46-.08.16-.013.294.04.4.16.107.107.16.333.16.68 0 .267-.046.507-.14.72-.08.2-.233.34-.46.42-.173.053-.4.1-.68.14-.28.053-.526.08-.74.08zm7.559 0c-1.014 0-1.894-.207-2.64-.62a4.336 4.336 0 01-1.74-1.76c-.414-.773-.62-1.68-.62-2.72 0-.787.113-1.487.34-2.1a4.51 4.51 0 011.02-1.6c.44-.453.966-.793 1.58-1.02.613-.24 1.3-.36 2.06-.36 1.013 0 1.893.207 2.64.62.746.413 1.326 1 1.74 1.76.413.76.62 1.66.62 2.7 0 .787-.12 1.493-.36 2.12a4.482 4.482 0 01-1 1.62c-.44.44-.967.78-1.58 1.02-.614.227-1.3.34-2.06.34zm0-1.9c.493 0 .926-.12 1.3-.36.373-.24.66-.593.86-1.06.213-.48.32-1.073.32-1.78 0-1.067-.227-1.86-.68-2.38-.454-.533-1.054-.8-1.8-.8-.494 0-.927.12-1.3.36-.374.227-.667.58-.88 1.06-.2.467-.3 1.053-.3 1.76 0 1.053.226 1.853.68 2.4.453.533 1.053.8 1.8.8zm11.623 5.5c-.72 0-1.42-.067-2.1-.2a6.97 6.97 0 01-1.82-.62c-.253-.133-.427-.293-.52-.48a1.084 1.084 0 01-.08-.58c.04-.187.12-.353.24-.5.133-.147.293-.247.48-.3a.757.757 0 01.58.08c.587.293 1.14.48 1.66.56.533.093.987.14 1.36.14.893 0 1.56-.22 2-.66.453-.427.68-1.067.68-1.92v-1.8h.18c-.2.68-.62 1.227-1.26 1.64-.627.4-1.34.6-2.14.6-.88 0-1.647-.2-2.3-.6a4.149 4.149 0 01-1.52-1.72c-.36-.733-.54-1.587-.54-2.56 0-.733.1-1.393.3-1.98.213-.6.507-1.113.88-1.54a3.898 3.898 0 011.38-.98 4.429 4.429 0 011.8-.36c.827 0 1.547.207 2.16.62.627.4 1.033.933 1.22 1.6l-.2.5v-1.42c0-.413.107-.727.32-.94.227-.213.533-.32.92-.32.4 0 .707.107.92.32.213.213.32.527.32.94v7.7c0 1.587-.42 2.78-1.26 3.58-.84.8-2.06 1.2-3.66 1.2zm-.06-5.94c.52 0 .967-.12 1.34-.36.373-.24.66-.58.86-1.02.213-.453.32-.987.32-1.6 0-.92-.227-1.64-.68-2.16-.453-.533-1.067-.8-1.84-.8-.52 0-.967.12-1.34.36-.373.24-.667.58-.88 1.02-.2.44-.3.967-.3 1.58 0 .92.227 1.647.68 2.18.453.533 1.067.8 1.84.8zm12.39 2.34c-1.106 0-2.06-.207-2.86-.62-.8-.413-1.42-1-1.86-1.76-.426-.76-.64-1.66-.64-2.7 0-1.013.207-1.9.62-2.66a4.656 4.656 0 011.74-1.78c.747-.44 1.594-.66 2.54-.66.694 0 1.314.113 1.86.34.56.227 1.034.553 1.42.98.4.427.7.947.9 1.56.214.6.32 1.28.32 2.04 0 .24-.086.427-.26.56-.16.12-.393.18-.7.18h-6.42v-1.44h5.62l-.32.3c0-.613-.093-1.127-.28-1.54a1.949 1.949 0 00-.78-.94c-.333-.227-.753-.34-1.26-.34-.56 0-1.04.133-1.44.4-.386.253-.686.62-.9 1.1-.2.467-.3 1.027-.3 1.68v.14c0 1.093.254 1.913.76 2.46.52.533 1.28.8 2.28.8.347 0 .734-.04 1.16-.12.44-.093.854-.247 1.24-.46.28-.16.527-.227.74-.2a.7.7 0 01.5.22c.134.133.214.3.24.5a.932.932 0 01-.12.58c-.093.2-.26.373-.5.52a5.353 5.353 0 01-1.62.66c-.6.133-1.16.2-1.68.2zm10.461 0c-.867 0-1.593-.147-2.18-.44-.573-.293-1-.72-1.28-1.28-.28-.573-.42-1.28-.42-2.12V44.1h-1.04c-.32 0-.567-.08-.74-.24-.173-.173-.26-.407-.26-.7 0-.307.087-.54.26-.7.173-.16.42-.24.74-.24h1.04V40.4c0-.413.107-.727.32-.94.227-.213.54-.32.94-.32.4 0 .707.107.92.32.213.213.32.527.32.94v1.82h2.12c.32 0 .567.08.74.24.173.16.26.393.26.7 0 .293-.087.527-.26.7-.173.16-.42.24-.74.24h-2.12v4.12c0 .64.14 1.12.42 1.44.28.32.733.48 1.36.48.227 0 .427-.02.6-.06a3.72 3.72 0 01.46-.08c.16-.013.293.04.4.16.107.107.16.333.16.68 0 .267-.047.507-.14.72-.08.2-.233.34-.46.42-.173.053-.4.1-.68.14a4.02 4.02 0 01-.74.08zm4.69-.04c-.4 0-.707-.107-.92-.32-.214-.227-.32-.547-.32-.96V39c0-.413.106-.727.32-.94.213-.213.52-.32.92-.32s.706.107.92.32c.226.213.34.527.34.94v5.18h-.28c.293-.707.746-1.24 1.36-1.6.626-.373 1.333-.56 2.12-.56.786 0 1.433.147 1.94.44.506.293.886.74 1.14 1.34.253.587.38 1.333.38 2.24v4.84c0 .413-.107.733-.32.96-.214.213-.52.32-.92.32s-.714-.107-.94-.32c-.214-.227-.32-.547-.32-.96v-4.72c0-.76-.147-1.313-.44-1.66-.28-.347-.72-.52-1.32-.52-.734 0-1.32.233-1.76.7-.427.453-.64 1.06-.64 1.82v4.38c0 .853-.42 1.28-1.26 1.28zm15.279.04c-1.107 0-2.06-.207-2.86-.62-.8-.413-1.42-1-1.86-1.76-.427-.76-.64-1.66-.64-2.7 0-1.013.207-1.9.62-2.66a4.656 4.656 0 011.74-1.78c.747-.44 1.593-.66 2.54-.66.693 0 1.313.113 1.86.34.56.227 1.033.553 1.42.98.4.427.7.947.9 1.56.213.6.32 1.28.32 2.04 0 .24-.087.427-.26.56-.16.12-.393.18-.7.18h-6.42v-1.44h5.62l-.32.3c0-.613-.093-1.127-.28-1.54a1.949 1.949 0 00-.78-.94c-.333-.227-.753-.34-1.26-.34-.56 0-1.04.133-1.44.4-.387.253-.687.62-.9 1.1-.2.467-.3 1.027-.3 1.68v.14c0 1.093.253 1.913.76 2.46.52.533 1.28.8 2.28.8.347 0 .733-.04 1.16-.12.44-.093.853-.247 1.24-.46.28-.16.527-.227.74-.2.213.013.38.087.5.22.133.133.213.3.24.5a.932.932 0 01-.12.58c-.093.2-.26.373-.5.52a5.374 5.374 0 01-1.62.66c-.6.133-1.16.2-1.68.2zm7.3-.04c-.413 0-.733-.107-.96-.32-.213-.227-.32-.547-.32-.96v-7.56c0-.413.107-.727.32-.94.213-.213.513-.32.9-.32s.687.107.9.32c.213.213.32.527.32.94v1.26h-.2c.187-.8.553-1.407 1.1-1.82.547-.413 1.273-.66 2.18-.74.28-.027.5.047.66.22.173.16.273.413.3.76.027.333-.053.607-.24.82-.173.2-.44.32-.8.36l-.44.04c-.813.08-1.427.333-1.84.76-.413.413-.62 1-.62 1.76v4.14c0 .413-.107.733-.32.96-.213.213-.527.32-.94.32zm15.762 0c-.334 0-.62-.08-.86-.24-.24-.173-.434-.44-.58-.8l-2.9-7.4c-.12-.32-.16-.6-.12-.84a.962.962 0 01.38-.6c.2-.147.466-.22.8-.22.293 0 .533.073.72.22.186.133.346.393.48.78l2.42 6.66h-.46l2.5-6.82c.106-.293.246-.507.42-.64.186-.133.426-.2.72-.2.293 0 .533.073.72.22.186.133.326.34.42.62l2.46 6.82h-.42l2.44-6.72c.133-.36.3-.607.5-.74.213-.133.446-.2.7-.2.32 0 .566.08.74.24a.95.95 0 01.3.62c.026.24-.02.507-.14.8l-2.88 7.4c-.134.347-.327.607-.58.78a1.43 1.43 0 01-.86.26c-.334 0-.627-.087-.88-.26-.24-.173-.427-.433-.56-.78l-2.62-6.94h1.14l-2.56 6.92c-.134.36-.32.627-.56.8-.24.173-.534.26-.88.26zm14.51-.02c-.4 0-.706-.12-.92-.36-.213-.24-.32-.573-.32-1v-7.34c0-.44.107-.773.32-1 .214-.24.52-.36.92-.36s.707.12.92.36c.227.227.34.56.34 1v7.34c0 .427-.106.76-.32 1-.213.24-.526.36-.94.36zm0-11.92c-.466 0-.833-.113-1.1-.34-.253-.24-.38-.567-.38-.98 0-.427.127-.753.38-.98.267-.227.634-.34 1.1-.34.48 0 .847.113 1.1.34.254.227.38.553.38.98 0 .413-.126.74-.38.98-.253.227-.62.34-1.1.34zm8.338 11.98c-.867 0-1.593-.147-2.18-.44-.573-.293-1-.72-1.28-1.28-.28-.573-.42-1.28-.42-2.12V44.1h-1.04c-.32 0-.567-.08-.74-.24-.173-.173-.26-.407-.26-.7 0-.307.087-.54.26-.7.173-.16.42-.24.74-.24h1.04V40.4c0-.413.107-.727.32-.94.227-.213.54-.32.94-.32.4 0 .707.107.92.32.213.213.32.527.32.94v1.82h2.12c.32 0 .567.08.74.24.173.16.26.393.26.7 0 .293-.087.527-.26.7-.173.16-.42.24-.74.24h-2.12v4.12c0 .64.14 1.12.42 1.44.28.32.733.48 1.36.48.227 0 .427-.02.6-.06a3.72 3.72 0 01.46-.08c.16-.013.293.04.4.16.107.107.16.333.16.68 0 .267-.047.507-.14.72-.08.2-.233.34-.46.42-.173.053-.4.1-.68.14a4.02 4.02 0 01-.74.08zm4.69-.04c-.4 0-.707-.107-.92-.32-.214-.227-.32-.547-.32-.96V39c0-.413.106-.727.32-.94.213-.213.52-.32.92-.32s.706.107.92.32c.226.213.34.527.34.94v5.18h-.28c.293-.707.746-1.24 1.36-1.6.626-.373 1.333-.56 2.12-.56.786 0 1.433.147 1.94.44.506.293.886.74 1.14 1.34.253.587.38 1.333.38 2.24v4.84c0 .413-.107.733-.32.96-.214.213-.52.32-.92.32s-.714-.107-.94-.32c-.214-.227-.32-.547-.32-.96v-4.72c0-.76-.147-1.313-.44-1.66-.28-.347-.72-.52-1.32-.52-.734 0-1.32.233-1.76.7-.427.453-.64 1.06-.64 1.82v4.38c0 .853-.42 1.28-1.26 1.28zM31.78 87.76c-.293 0-.533-.08-.72-.24a.913.913 0 01-.34-.6c-.027-.253.02-.52.14-.8l1.36-3.02v1.04l-3.64-8.42c-.12-.293-.16-.567-.12-.82a.886.886 0 01.36-.6c.213-.16.5-.24.86-.24.307 0 .553.073.74.22.187.133.353.393.5.78l2.7 6.74h-.6l2.76-6.76c.147-.373.32-.627.52-.76.2-.147.467-.22.8-.22.293 0 .527.08.7.24a.95.95 0 01.32.6c.04.24-.007.507-.14.8l-4.86 11.1c-.173.373-.36.627-.56.76-.2.133-.46.2-.78.2zm12.312-3.56c-1.013 0-1.893-.207-2.64-.62a4.337 4.337 0 01-1.74-1.76c-.413-.773-.62-1.68-.62-2.72 0-.787.113-1.487.34-2.1a4.51 4.51 0 011.02-1.6c.44-.453.967-.793 1.58-1.02.613-.24 1.3-.36 2.06-.36 1.013 0 1.893.207 2.64.62.747.413 1.327 1 1.74 1.76.413.76.62 1.66.62 2.7 0 .787-.12 1.493-.36 2.12a4.481 4.481 0 01-1 1.62c-.44.44-.967.78-1.58 1.02-.613.227-1.3.34-2.06.34zm0-1.9c.493 0 .927-.12 1.3-.36s.66-.593.86-1.06c.213-.48.32-1.073.32-1.78 0-1.067-.227-1.86-.68-2.38-.453-.533-1.053-.8-1.8-.8-.493 0-.927.12-1.3.36-.373.227-.667.58-.88 1.06-.2.467-.3 1.053-.3 1.76 0 1.053.227 1.853.68 2.4.453.533 1.053.8 1.8.8zm10.604 1.9c-.814 0-1.487-.147-2.02-.44-.534-.307-.934-.76-1.2-1.36-.254-.6-.38-1.347-.38-2.24v-4.84c0-.427.106-.74.32-.94.213-.213.52-.32.92-.32s.706.107.92.32c.226.2.34.513.34.94v4.88c0 .693.14 1.207.42 1.54.28.333.726.5 1.34.5.666 0 1.213-.227 1.64-.68.426-.467.64-1.08.64-1.84v-4.4c0-.427.106-.74.32-.94.213-.213.52-.32.92-.32s.706.107.92.32c.226.2.34.513.34.94v7.56c0 .853-.407 1.28-1.22 1.28-.387 0-.687-.107-.9-.32-.214-.227-.32-.547-.32-.96v-1.52l.28.6c-.28.72-.707 1.273-1.28 1.66-.56.387-1.227.58-2 .58zm9.322-.04c-.414 0-.734-.107-.96-.32-.214-.227-.32-.547-.32-.96v-7.56c0-.413.106-.727.32-.94.213-.213.513-.32.9-.32.386 0 .686.107.9.32.213.213.32.527.32.94v1.26h-.2c.186-.8.553-1.407 1.1-1.82.546-.413 1.273-.66 2.18-.74.28-.027.5.047.66.22.173.16.273.413.3.76.026.333-.054.607-.24.82-.174.2-.44.32-.8.36l-.44.04c-.814.08-1.427.333-1.84.76-.414.413-.62 1-.62 1.76v4.14c0 .413-.107.733-.32.96-.214.213-.527.32-.94.32zm13.901 0c-.4 0-.713-.107-.94-.32-.213-.227-.32-.547-.32-.96V76.1h-.92c-.32 0-.566-.08-.74-.24-.173-.173-.26-.407-.26-.7 0-.307.087-.54.26-.7.174-.16.42-.24.74-.24h1.64l-.72.66v-.68c0-1.373.347-2.4 1.04-3.08.694-.693 1.694-1.1 3-1.22l.68-.06c.267-.027.48.02.64.14.16.107.267.253.32.44.054.173.06.353.02.54-.04.187-.126.353-.26.5a.679.679 0 01-.48.22l-.28.02c-.76.053-1.313.247-1.66.58-.346.333-.52.84-.52 1.52v.74l-.32-.32h2.02c.32 0 .567.08.74.24.174.16.26.393.26.7 0 .293-.086.527-.26.7-.173.16-.42.24-.74.24h-1.7v6.78c0 .853-.413 1.28-1.24 1.28zm6.645 0c-.413 0-.733-.107-.96-.32-.213-.227-.32-.547-.32-.96v-7.56c0-.413.107-.727.32-.94.214-.213.514-.32.9-.32.387 0 .687.107.9.32.214.213.32.527.32.94v1.26h-.2c.187-.8.554-1.407 1.1-1.82.547-.413 1.274-.66 2.18-.74.28-.027.5.047.66.22.174.16.274.413.3.76.027.333-.053.607-.24.82-.173.2-.44.32-.8.36l-.44.04c-.813.08-1.426.333-1.84.76-.413.413-.62 1-.62 1.76v4.14c0 .413-.106.733-.32.96-.213.213-.526.32-.94.32zm7.792-.02c-.4 0-.706-.12-.92-.36-.213-.24-.32-.573-.32-1v-7.34c0-.44.107-.773.32-1 .214-.24.52-.36.92-.36s.707.12.92.36c.227.227.34.56.34 1v7.34c0 .427-.106.76-.32 1-.213.24-.526.36-.94.36zm0-11.92c-.466 0-.833-.113-1.1-.34-.253-.24-.38-.567-.38-.98 0-.427.127-.753.38-.98.267-.227.634-.34 1.1-.34.48 0 .847.113 1.1.34.254.227.38.553.38.98 0 .413-.126.74-.38.98-.253.227-.62.34-1.1.34zm8.678 11.98c-1.107 0-2.06-.207-2.86-.62-.8-.413-1.42-1-1.86-1.76-.427-.76-.64-1.66-.64-2.7 0-1.013.207-1.9.62-2.66a4.65 4.65 0 011.74-1.78c.747-.44 1.593-.66 2.54-.66.693 0 1.313.113 1.86.34.56.227 1.033.553 1.42.98.4.427.7.947.9 1.56.213.6.32 1.28.32 2.04 0 .24-.087.427-.26.56-.16.12-.393.18-.7.18h-6.42v-1.44h5.62l-.32.3c0-.613-.093-1.127-.28-1.54a1.949 1.949 0 00-.78-.94c-.333-.227-.753-.34-1.26-.34-.56 0-1.04.133-1.44.4-.387.253-.687.62-.9 1.1-.2.467-.3 1.027-.3 1.68v.14c0 1.093.253 1.913.76 2.46.52.533 1.28.8 2.28.8.347 0 .733-.04 1.16-.12.44-.093.853-.247 1.24-.46.28-.16.527-.227.74-.2.213.013.38.087.5.22.133.133.213.3.24.5a.932.932 0 01-.12.58c-.093.2-.26.373-.5.52a5.374 5.374 0 01-1.62.66c-.6.133-1.16.2-1.68.2zm7.26-.04c-.4 0-.707-.107-.92-.32-.213-.227-.32-.547-.32-.96v-7.56c0-.413.107-.727.32-.94.213-.213.513-.32.9-.32s.687.107.9.32c.213.213.32.527.32.94v1.36l-.22-.5c.293-.707.747-1.24 1.36-1.6.627-.373 1.333-.56 2.12-.56.787 0 1.433.147 1.94.44.507.293.887.74 1.14 1.34.253.587.38 1.333.38 2.24v4.84c0 .413-.107.733-.32.96-.213.213-.52.32-.92.32s-.713-.107-.94-.32c-.213-.227-.32-.547-.32-.96v-4.72c0-.76-.147-1.313-.44-1.66-.28-.347-.72-.52-1.32-.52-.733 0-1.32.233-1.76.7-.427.453-.64 1.06-.64 1.82v4.38c0 .853-.42 1.28-1.26 1.28zm14.219.04c-.853 0-1.607-.207-2.26-.62-.64-.413-1.14-1-1.5-1.76-.36-.773-.54-1.68-.54-2.72 0-1.053.18-1.953.54-2.7.36-.76.86-1.347 1.5-1.76.653-.413 1.407-.62 2.26-.62.813 0 1.52.2 2.12.6.613.4 1.027.927 1.24 1.58h-.22V71c0-.413.107-.727.32-.94.213-.213.52-.32.92-.32s.707.107.92.32c.227.213.34.527.34.94v11.88c0 .413-.107.733-.32.96-.213.213-.52.32-.92.32s-.707-.107-.92-.32c-.213-.227-.32-.547-.32-.96v-1.56l.22.6a2.93 2.93 0 01-1.22 1.66c-.613.413-1.333.62-2.16.62zm.7-1.9c.493 0 .927-.12 1.3-.36s.66-.593.86-1.06c.213-.48.32-1.073.32-1.78 0-1.067-.227-1.86-.68-2.38-.453-.533-1.053-.8-1.8-.8-.493 0-.927.12-1.3.36-.373.227-.667.58-.88 1.06-.2.467-.3 1.053-.3 1.76 0 1.053.227 1.853.68 2.4.453.533 1.053.8 1.8.8zm11.112 1.9c-.573 0-1.18-.06-1.82-.18a5.389 5.389 0 01-1.72-.62 1.27 1.27 0 01-.46-.46 1.144 1.144 0 01-.1-.54.981.981 0 01.2-.48.832.832 0 01.44-.26c.187-.04.387-.007.6.1a7.374 7.374 0 001.5.54c.467.093.927.14 1.38.14.64 0 1.114-.107 1.42-.32.32-.227.48-.52.48-.88 0-.307-.106-.54-.32-.7-.2-.173-.506-.3-.92-.38l-2-.38c-.826-.16-1.46-.46-1.9-.9-.426-.453-.64-1.033-.64-1.74 0-.64.174-1.193.52-1.66.36-.467.854-.827 1.48-1.08.627-.253 1.347-.38 2.16-.38.587 0 1.134.067 1.64.2.52.12 1.02.313 1.5.58.2.107.334.247.4.42.08.173.1.353.06.54-.04.173-.12.333-.24.48a.836.836 0 01-.46.26c-.173.027-.373-.013-.6-.12a5.37 5.37 0 00-1.2-.46 4.447 4.447 0 00-1.08-.14c-.653 0-1.14.113-1.46.34-.306.227-.46.527-.46.9 0 .28.094.513.28.7.187.187.474.313.86.38l2 .38c.867.16 1.52.453 1.96.88.454.427.68 1 .68 1.72 0 .973-.38 1.74-1.14 2.3-.76.547-1.773.82-3.04.82zm12.856-.04c-.4 0-.707-.107-.92-.32-.214-.227-.32-.547-.32-.96v-7.56c0-.413.106-.727.32-.94.213-.213.513-.32.9-.32.386 0 .686.107.9.32.213.213.32.527.32.94v1.36l-.22-.5c.293-.707.746-1.24 1.36-1.6.626-.373 1.333-.56 2.12-.56.786 0 1.433.147 1.94.44.506.293.886.74 1.14 1.34.253.587.38 1.333.38 2.24v4.84c0 .413-.107.733-.32.96-.214.213-.52.32-.92.32s-.714-.107-.94-.32c-.214-.227-.32-.547-.32-.96v-4.72c0-.76-.147-1.313-.44-1.66-.28-.347-.72-.52-1.32-.52-.734 0-1.32.233-1.76.7-.427.453-.64 1.06-.64 1.82v4.38c0 .853-.42 1.28-1.26 1.28zm14.919.04c-1.013 0-1.893-.207-2.64-.62a4.333 4.333 0 01-1.74-1.76c-.413-.773-.62-1.68-.62-2.72 0-.787.113-1.487.34-2.1a4.51 4.51 0 011.02-1.6c.44-.453.967-.793 1.58-1.02.613-.24 1.3-.36 2.06-.36 1.013 0 1.893.207 2.64.62.747.413 1.327 1 1.74 1.76.413.76.62 1.66.62 2.7 0 .787-.12 1.493-.36 2.12a4.486 4.486 0 01-1 1.62c-.44.44-.967.78-1.58 1.02-.613.227-1.3.34-2.06.34zm0-1.9c.493 0 .927-.12 1.3-.36s.66-.593.86-1.06c.213-.48.32-1.073.32-1.78 0-1.067-.227-1.86-.68-2.38-.453-.533-1.053-.8-1.8-.8-.493 0-.927.12-1.3.36-.373.227-.667.58-.88 1.06-.2.467-.3 1.053-.3 1.76 0 1.053.227 1.853.68 2.4.453.533 1.053.8 1.8.8zm10.648 1.86c-.333 0-.62-.08-.86-.24-.24-.173-.433-.44-.58-.8l-2.9-7.4c-.12-.32-.16-.6-.12-.84a.962.962 0 01.38-.6c.2-.147.467-.22.8-.22.293 0 .533.073.72.22.187.133.347.393.48.78l2.42 6.66h-.46l2.5-6.82c.107-.293.247-.507.42-.64.187-.133.427-.2.72-.2s.533.073.72.22c.187.133.327.34.42.62l2.46 6.82h-.42l2.44-6.72c.133-.36.3-.607.5-.74.213-.133.447-.2.7-.2.32 0 .567.08.74.24a.95.95 0 01.3.62c.027.24-.02.507-.14.8l-2.88 7.4c-.133.347-.327.607-.58.78a1.43 1.43 0 01-.86.26 1.52 1.52 0 01-.88-.26c-.24-.173-.427-.433-.56-.78l-2.62-6.94h1.14l-2.56 6.92c-.133.36-.32.627-.56.8-.24.173-.533.26-.88.26zm14.471-4.22c-.254 0-.454-.08-.6-.24-.134-.16-.214-.387-.24-.68l-.6-7.64c-.04-.493.066-.887.32-1.18.253-.307.626-.46 1.12-.46.48 0 .84.153 1.08.46.253.293.36.687.32 1.18l-.6 7.64c-.014.293-.094.52-.24.68-.134.16-.32.24-.56.24zm0 4.16c-.454 0-.82-.14-1.1-.42-.267-.28-.4-.64-.4-1.08 0-.427.133-.773.4-1.04.28-.28.646-.42 1.1-.42.466 0 .826.14 1.08.42.266.267.4.613.4 1.04 0 .44-.134.8-.4 1.08-.254.28-.614.42-1.08.42z"
        fill="#fff"
      />
      <Rect x={28} y={109} width={113} height={32} rx={16} fill="#fff" />
      <Path
        d="M46.087 130.098c-.514 0-.77-.257-.77-.77v-8.414c0-.523.26-.784.784-.784h4.984c.4 0 .602.191.602.574 0 .401-.201.602-.602.602h-4.312v3.15h4.032c.4 0 .602.191.602.574 0 .401-.201.602-.602.602h-4.032v3.696c0 .513-.23.77-.686.77zm8.124-8.456c-.28 0-.5-.07-.658-.21-.15-.14-.224-.336-.224-.588 0-.532.294-.798.882-.798.588 0 .882.266.882.798s-.294.798-.882.798zm0 8.442c-.467 0-.7-.257-.7-.77v-5.46c0-.504.233-.756.7-.756.476 0 .714.252.714.756v5.46c0 .513-.238.77-.714.77zm3.604.014c-.466 0-.7-.238-.7-.714v-5.6c0-.476.229-.714.686-.714.458 0 .686.238.686.714v.518a2.36 2.36 0 01.952-.938c.411-.215.868-.322 1.372-.322 1.615 0 2.422.915 2.422 2.744v3.598c0 .476-.233.714-.7.714-.476 0-.714-.238-.714-.714v-3.514c0-.588-.116-1.017-.35-1.288-.224-.271-.578-.406-1.064-.406-.569 0-1.026.182-1.372.546-.336.355-.504.826-.504 1.414v3.248c0 .476-.238.714-.714.714zm10.17.028c-.597 0-1.124-.14-1.581-.42-.448-.289-.798-.7-1.05-1.232s-.378-1.162-.378-1.89.126-1.353.378-1.876c.252-.532.602-.943 1.05-1.232.448-.289.975-.434 1.582-.434.513 0 .97.112 1.372.336.401.224.7.527.896.91v-3.542c0-.476.233-.714.7-.714.476 0 .714.238.714.714v8.638c0 .476-.234.714-.7.714-.467 0-.7-.238-.7-.714v-.532a2.311 2.311 0 01-.91.938 2.767 2.767 0 01-1.372.336zm.365-1.092c.578 0 1.045-.21 1.4-.63.354-.42.532-1.027.532-1.82 0-.793-.178-1.395-.532-1.806-.355-.42-.822-.63-1.4-.63-.588 0-1.06.21-1.414.63-.355.411-.532 1.013-.532 1.806 0 .793.177 1.4.532 1.82.354.42.826.63 1.414.63zm10.319 1.064c-.514 0-.77-.257-.77-.77v-8.414c0-.523.26-.784.784-.784h4.984c.4 0 .602.191.602.574 0 .401-.201.602-.602.602h-4.312v3.15h4.032c.4 0 .602.191.602.574 0 .401-.201.602-.602.602h-4.032v3.696c0 .513-.23.77-.686.77zm7.605 0c-.476 0-.714-.238-.714-.714v-5.6c0-.476.228-.714.686-.714.457 0 .686.238.686.714v.602c.186-.42.466-.742.84-.966.382-.224.844-.355 1.386-.392.345-.028.532.159.56.56.037.411-.163.635-.602.672l-.266.028c-1.241.121-1.862.761-1.862 1.918v3.178c0 .476-.238.714-.714.714zm5.409-8.456c-.28 0-.5-.07-.659-.21-.149-.14-.224-.336-.224-.588 0-.532.294-.798.883-.798.587 0 .881.266.881.798s-.293.798-.881.798zm0 8.442c-.467 0-.7-.257-.7-.77v-5.46c0-.504.233-.756.7-.756.475 0 .713.252.713.756v5.46c0 .513-.237.77-.713.77zm6.11.042c-1.12 0-2.002-.313-2.646-.938-.644-.635-.966-1.498-.966-2.59 0-.7.14-1.316.42-1.848.29-.541.686-.961 1.19-1.26.504-.299 1.082-.448 1.736-.448.942 0 1.684.303 2.226.91.541.597.812 1.423.812 2.478 0 .317-.187.476-.56.476h-4.452c.102 1.419.854 2.128 2.254 2.128.28 0 .574-.033.882-.098.308-.075.606-.205.896-.392.196-.112.364-.149.504-.112a.43.43 0 01.322.238.541.541 0 01.028.42c-.038.149-.145.28-.322.392-.318.215-.69.378-1.12.49-.42.103-.822.154-1.204.154zm-.21-6.09c-.588 0-1.055.182-1.4.546-.346.364-.556.849-.63 1.456h3.822c-.028-.635-.196-1.125-.504-1.47-.308-.355-.738-.532-1.288-.532zm5.423 6.062c-.466 0-.7-.238-.7-.714v-5.6c0-.476.229-.714.686-.714.458 0 .686.238.686.714v.518c.234-.411.551-.723.952-.938a2.913 2.913 0 011.372-.322c1.615 0 2.422.915 2.422 2.744v3.598c0 .476-.233.714-.7.714-.476 0-.714-.238-.714-.714v-3.514c0-.588-.116-1.017-.35-1.288-.224-.271-.578-.406-1.064-.406-.569 0-1.026.182-1.372.546-.336.355-.504.826-.504 1.414v3.248c0 .476-.238.714-.714.714zm10.171.028c-.598 0-1.125-.14-1.582-.42-.448-.289-.798-.7-1.05-1.232s-.378-1.162-.378-1.89.126-1.353.378-1.876c.252-.532.602-.943 1.05-1.232.448-.289.975-.434 1.582-.434.513 0 .97.112 1.372.336.401.224.7.527.896.91v-3.542c0-.476.233-.714.7-.714.476 0 .714.238.714.714v8.638c0 .476-.234.714-.7.714-.467 0-.7-.238-.7-.714v-.532a2.318 2.318 0 01-.91.938 2.77 2.77 0 01-1.372.336zm.364-1.092c.578 0 1.045-.21 1.4-.63.354-.42.532-1.027.532-1.82 0-.793-.178-1.395-.532-1.806-.355-.42-.822-.63-1.4-.63-.588 0-1.06.21-1.414.63-.355.411-.532 1.013-.532 1.806 0 .793.177 1.4.532 1.82.354.42.826.63 1.414.63zm7.897 1.092c-.41 0-.835-.047-1.274-.14a3.62 3.62 0 01-1.19-.476c-.158-.093-.256-.21-.294-.35a.564.564 0 01.028-.392.473.473 0 01.266-.252c.131-.056.276-.042.434.042.364.196.714.336 1.05.42.336.084.668.126.994.126.495 0 .868-.089 1.12-.266a.83.83 0 00.378-.714c0-.243-.084-.429-.252-.56-.168-.14-.42-.247-.756-.322l-1.33-.266c-1.176-.243-1.764-.849-1.764-1.82 0-.644.257-1.157.77-1.54.514-.383 1.186-.574 2.016-.574.84 0 1.564.205 2.17.616.15.093.238.21.266.35a.533.533 0 01-.056.378.535.535 0 01-.294.238c-.121.047-.266.028-.434-.056a3.287 3.287 0 00-.84-.364 2.818 2.818 0 00-.812-.126c-.485 0-.854.093-1.106.28a.843.843 0 00-.378.728c0 .467.308.765.924.896l1.33.266c.607.121 1.064.327 1.372.616.318.289.476.681.476 1.176 0 .653-.256 1.167-.77 1.54-.513.364-1.194.546-2.044.546z"
        fill="#6949FF"
      />
      <Path
        d="M222.624 130.594a11.002 11.002 0 01-10.639 13.266 11.01 11.01 0 01-10.239-6.675 11.005 11.005 0 01-.698-6.348l.983.184-.983-.184a11.005 11.005 0 018.543-8.74 10.985 10.985 0 0111.353 4.545 10.968 10.968 0 011.68 3.952zm0 0l.001.001-.979.204.978-.205z"
        fill="#C3B6FF"
        stroke="#EEE"
        strokeWidth={2}
      />
      <Path
        d="M206.65 130.642c.131-1.375.799-2.752 1.979-3.459 1.179-.706 3.183-.438 4.342.312 2.119 1.372 3.819 7.27 3.02 9.418-.242.038-1.069.204-1.313.247l-.584-1.068.24 1.129c-.388.07-.778.144-1.171.223a5.185 5.185 0 01-6.059-3.882c-.298-1.249-.505-2.378-.454-2.92z"
        fill="#2F2E41"
      />
      <Path
        d="M211.947 133.982a2.85 2.85 0 10-1.185-5.575 2.85 2.85 0 001.185 5.575z"
        fill="#9E616A"
      />
      <Path
        d="M208.429 129.257l2.868-2.289a4.122 4.122 0 013.073 2.84l.284.941-1.417-.056-.408-1.194.012 1.178-.654-.026-.398-1.904-.217 2.033-2.323-.038-.82-1.485z"
        fill="#2F2E41"
      />
      <Path
        d="M220.495 137.791a9.998 9.998 0 01-13.475 3.898l.342-2.52a2.571 2.571 0 011.826-1.923l.527-.146 1.039-1.368s3.403-.851 3.34-.899l2.343.808-.004-.009.827-.123c.462-.07.934-.012 1.366.167.432.178.807.471 1.085.847l.784 1.268z"
        fill="url(#paint1_linear_2136_29685)"
      />
      <Path
        d="M305.14 92.93c6.042-.635 10.425-6.048 9.79-12.09-.635-6.041-6.047-10.424-12.089-9.79-6.042.636-10.425 6.049-9.79 12.09.635 6.042 6.047 10.425 12.089 9.79z"
        fill="#C3B6FF"
        stroke="#EEE"
        strokeWidth={2}
      />
      <Path
        d="M304.502 82.963a3.261 3.261 0 10-.682-6.487 3.261 3.261 0 00.682 6.487z"
        fill="#FFB8B8"
      />
      <Path
        d="M306.792 77.277s.674-1.703-1.199-1.654c0 0-1.734-1.27-3.225.073 0 0-.881.093-1.257 1.14 0 0-.72-.19-.799.529 0 0-.352 1.52.293 2.788.646 1.267.83 1.396.83 1.396s-.528-1.602 1.483-1.961c2.011-.36 3.737-1.825 4.076-.229.338 1.597.447.848.447.848s1.362-2.474-.649-2.93z"
        fill="#2F2E41"
      />
      <Path
        d="M312.109 87.823a9.994 9.994 0 01-13.808 2.468l.603-2.47a2.57 2.57 0 012.017-1.722l.539-.09 1.177-1.252s3.474-.49 3.416-.545l2.245 1.048-.003-.008.836-.036a2.572 2.572 0 012.331 1.264l.647 1.343z"
        fill="url(#paint2_linear_2136_29685)"
      />
      <Path
        d="M347.658 112.097c9.274 1.468 17.982-4.858 19.45-14.132 1.469-9.273-4.858-17.981-14.131-19.45-9.273-1.469-17.981 4.858-19.45 14.132-1.469 9.273 4.858 17.981 14.131 19.45z"
        fill="#C3B6FF"
        stroke="#EEE"
        strokeWidth={2}
      />
      <Path
        d="M344.847 88.103a15.01 15.01 0 01-1.595 3.214c-3.722 5.455 4.522 4.79 7.359 5.24 3.102.491 5.811 2.592 6.506-4.727.296-3.126-1.625-6.015-4.727-6.506-2.65-.42-6.561.168-7.543 2.78z"
        fill="#2F2E41"
      />
      <Path
        d="M350.146 96.482a4.622 4.622 0 101.444-9.13 4.622 4.622 0 00-1.444 9.13z"
        fill="#FFB6B6"
      />
      <Path
        d="M348.507 86.775a5.295 5.295 0 017.226 5.821c-2.418.216-4.932.276-7.271-1.008l-.359-1.526-.572 1.38c-.804.188-1.603.33-2.27-.363a5.41 5.41 0 013.246-4.304z"
        fill="#2F2E41"
      />
      <Path
        d="M360.941 107.76a15.994 15.994 0 01-22.363-1.904l1.955-3.567a4.113 4.113 0 013.83-1.826l.871.084 2.337-1.448s5.572.68 5.505.572l3.036 2.55-.001-.014 1.307.29a4.112 4.112 0 013.079 2.919l.444 2.344z"
        fill="url(#paint3_linear_2136_29685)"
      />
      <Path
        d="M282.789 150.49c8.223 1.01 15.707-4.838 16.716-13.06 1.01-8.223-4.837-15.707-13.06-16.716-8.222-1.01-15.706 4.837-16.716 13.06-1.01 8.222 4.838 15.706 13.06 16.716z"
        fill="#C3B6FF"
        stroke="#EEE"
        strokeWidth={2}
      />
      <Path
        d="M284.022 137.276a4.468 4.468 0 101.09-8.872 4.468 4.468 0 00-1.09 8.872z"
        fill="#FFB6B6"
      />
      <Path
        d="M293.901 146.179a13.997 13.997 0 01-19.614-.982l1.601-3.179a3.599 3.599 0 013.294-1.713l.764.046 1.999-1.337s4.893.424 4.831.332l2.733 2.137-.001-.012 1.151.213a3.606 3.606 0 012.782 2.459l.46 2.036z"
        fill="url(#paint4_linear_2136_29685)"
      />
      <Path
        d="M289.583 130.664a5.76 5.76 0 00-1.995-3.553c-.858-.71-1.983-1.156-3.076-.971-1.094.186-2.095 1.114-2.163 2.241-.365-.177-.819-.057-1.134.203-.315.26-.513.638-.669 1.02a6.948 6.948 0 00-.405 3.828l-.042.176c.525-.022.969-.416 1.27-.857.301-.44.504-.945.824-1.372.319-.427.806-.782 1.329-.733l-.143.791 1.43-.528-.414.727 1.235-.347-.221.72c.497-.837 1.746-1.077 2.502-.483.439.345.688.895.786 1.453.097.557.06 1.129.022 1.695a5.874 5.874 0 00.864-4.01z"
        fill="#2F2E41"
      />
      <Path
        d="M280.512 47.277c8.104 1.722 16.069-3.45 17.791-11.553 1.723-8.104-3.45-16.069-11.553-17.791-8.104-1.723-16.069 3.45-17.791 11.553-1.723 8.103 3.45 16.069 11.553 17.791z"
        fill="#C3B6FF"
        stroke="#EEE"
        strokeWidth={2}
      />
      <Path
        d="M280.963 26.667a1.976 1.976 0 10.822-3.866 1.976 1.976 0 00-.822 3.866z"
        fill="#2F2E41"
      />
      <Path
        d="M282.494 34.671a5.007 5.007 0 102.082-9.795 5.007 5.007 0 00-2.082 9.795z"
        fill="#2F2E41"
      />
      <Path
        d="M282.899 34.756a4.068 4.068 0 101.693-7.958 4.068 4.068 0 00-1.693 7.958z"
        fill="#9E616A"
      />
      <Path
        d="M287.311 27.294a4.662 4.662 0 00-7.777 2.505c1.92.94 3.968 1.783 6.295 1.466l.777-1.142.035 1.315c.602.41 1.214.777 1.98.418a4.758 4.758 0 00-1.31-4.563z"
        fill="#2F2E41"
      />
      <Path
        d="M280.689 19.103c-1.207-.897-2.945-.966-4.263-.242-1.317.725-2.179 2.177-2.274 3.677-.096 1.531.535 3.001 1.101 4.427.567 1.425 1.088 2.966.768 4.467a4.172 4.172 0 01-4.94 3.213c1.152.815 2.358 1.653 3.751 1.882 1.393.228 3.027-.351 3.542-1.666.371-.947.092-2.006-.116-3.002a20.606 20.606 0 01-.423-4.936c.028-.79.111-1.61.515-2.29a2.755 2.755 0 013.054-1.2l.543-.313c.513-1.414-.052-3.12-1.258-4.017z"
        fill="#2F2E41"
      />
      <Path
        d="M291.987 43.957a13.995 13.995 0 01-19.453-2.687l1.871-3.028a3.603 3.603 0 013.431-1.42l.757.113 2.108-1.158s4.837.85 4.784.752l2.536 2.367v-.012l1.128.313a3.596 3.596 0 012.557 2.692l.281 2.068z"
        fill="url(#paint5_linear_2136_29685)"
      />
      <Path
        d="M338.83 51.117c7.14.75 13.537-4.43 14.287-11.57.751-7.14-4.429-13.537-11.569-14.287-7.141-.75-13.538 4.43-14.288 11.57-.751 7.14 4.429 13.537 11.57 14.287z"
        fill="#C3B6FF"
        stroke="#EEE"
        strokeWidth={2}
      />
      <Path
        d="M340.243 38.697a4.785 4.785 0 101-9.518 4.785 4.785 0 00-1 9.518z"
        fill="#2F2E41"
      />
      <Path
        d="M340.179 39.323a4.274 4.274 0 10.894-8.503 4.276 4.276 0 00-.894 8.503z"
        fill="#FFB8B8"
      />
      <Path
        d="M348.285 46.968a11.995 11.995 0 01-16.824-.548l1.324-2.749a3.096 3.096 0 012.798-1.517l.655.028 1.694-1.176s4.199.29 4.145.212l2.374 1.791-.001-.01.99.165a3.09 3.09 0 012.42 2.066l.425 1.738z"
        fill="url(#paint6_linear_2136_29685)"
      />
      <Path
        d="M345.268 34.052c.064-.315.111-.632.142-.95a4.524 4.524 0 00-.146-1.877 2.843 2.843 0 00-1.329-1.585 2.716 2.716 0 00-2.025-.211c-.547-.432-1.167-.794-1.849-.902-.682-.109-1.434.07-1.915.585a3.04 3.04 0 01-.364.382c-.373.28-.884.18-1.329.068l.553.584-.756.115.804.61c-.883.412-1.375 1.46-1.379 2.459-.004.945.358 1.848.818 2.665.263-.432.274-.98.324-1.493.015-.166.043-.33.082-.493 1.779.629 3.656 1.11 5.662.619l.488-.91.161.035.127.957c.488.262.979.498 1.51.36.01.147.01.296.006.438.062-.164.118-.33.17-.498.071-.03.14-.064.206-.104.043-.282.056-.569.039-.854z"
        fill="#2F2E41"
      />
      <Path
        d="M347.223 146.132a10.998 10.998 0 001.423-6.224 10.951 10.951 0 00-11.742-10.208 11 11 0 1010.319 16.432z"
        fill="#C3B6FF"
        stroke="#EEE"
        strokeWidth={2}
      />
      <Path
        d="M341.586 138.001l-.043.093c.363-1.114-.129-2.42-.97-3.182-.841-.761-1.957-1.058-3.04-1.131-.804-.055-1.63.006-2.367.351-1.067.499-1.837 1.536-2.465 2.602-.288.488-.565 1.04-.493 1.619.068.538.42.974.714 1.413.295.44.554.993.4 1.506-.091.305-.313.536-.489.793-.175.258-.31.598-.196.897a.727.727 0 00.567.427c.236.038.475-.015.708-.067l6.05-1.351a2.609 2.609 0 001.849-1.561 2.61 2.61 0 00-.225-2.409z"
        fill="#2F2E41"
      />
      <Path
        d="M340.079 139.397a2.998 2.998 0 10-5.972-.545 2.998 2.998 0 005.972.545z"
        fill="#FFB9B9"
      />
      <Path
        d="M345.623 146.736a9.998 9.998 0 01-13.886 1.985l.689-2.448a2.579 2.579 0 012.076-1.65l.542-.071 1.22-1.211s3.488-.369 3.432-.425l2.208 1.126-.003-.009.837-.007a2.576 2.576 0 012.285 1.345l.6 1.365z"
        fill="url(#paint7_linear_2136_29685)"
      />
      <Path
        d="M339.735 136.151c-.105-.403-.535-.561-.898-.626a8.206 8.206 0 00-3.181.047c-.763.164-1.535.462-2.053 1.103a2.861 2.861 0 00-.592 1.886c.005.407.124.805.343 1.148.225.327.586.55.939.516l.045.123c1.486-.315 2.815-1.346 3.597-2.792a3.25 3.25 0 01-.84 1.595 5.917 5.917 0 002.408-2.139c.161-.249.313-.555.232-.861z"
        fill="#2F2E41"
      />
      <Path
        d="M255.437 112.906c9.297-1.307 15.775-9.903 14.469-19.2-1.307-9.298-9.903-15.776-19.201-14.47-9.297 1.307-15.775 9.903-14.468 19.201 1.306 9.297 9.903 15.775 19.2 14.469z"
        fill="#C3B6FF"
        stroke="#EEE"
        strokeWidth={2}
      />
      <Path
        d="M252.954 97.763a4.854 4.854 0 10-1.352-9.614 4.854 4.854 0 001.352 9.614z"
        fill="#9E616A"
      />
      <Path
        d="M266.224 104.89a15.992 15.992 0 01-21.942 4.718l.826-3.983a4.125 4.125 0 013.13-2.866l.857-.174 1.811-2.068s5.527-.979 5.431-1.062l3.65 1.551-.005-.014 1.334-.105a4.112 4.112 0 013.798 1.892l1.11 2.111z"
        fill="url(#paint8_linear_2136_29685)"
      />
      <Path
        d="M248.223 95.793l-.039-.076c-.016.02-.031.039-.049.057l.088.019zM257.795 90.438a3.494 3.494 0 00-1.645-2.341c-.311-.182-.661-.324-.89-.603a4.938 4.938 0 01-.362-.632c-.492-.826-1.61-1.145-2.534-.88-.925.266-1.652 1.016-2.093 1.87a1.585 1.585 0 00-2.044 1.246c-.052.299-.016.606.102.886-.544-.325-1.29.1-1.518.692-.228.59-.085 1.255.093 1.863.322 1.099.75 2.163 1.28 3.178.417-.485.28-1.244.131-1.88-.154-.662-.233-1.485.306-1.898.521-.399 1.258-.145 1.907-.05a3.584 3.584 0 002.869-.875c.295-.265.545-.582.871-.808.325-.226.763-.35 1.12-.177.326.157.499.512.649.841l1.064 2.343a3.5 3.5 0 00.645-1.313 3.5 3.5 0 00.049-1.462z"
        fill="#2F2E41"
      />
    </G>
    <Path
      d="M0 0h382H0zm382 150c0 14.359-11.641 26-26 26H26c-14.36 0-26-11.641-26-26 0 7.732 8.954 14 20 14h342c11.046 0 20-6.268 20-14zM0 170V0v170zM382 0v170V0z"
      fill="#543ACC"
      mask="url(#a)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2136_29685"
        x1={382}
        y1={170}
        x2={36.0768}
        y2={-55.3738}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6949FF" />
        <Stop offset={1} stopColor="#876DFF" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_2136_29685"
        x1={221.201}
        y1={141.114}
        x2={205.889}
        y2={136.717}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6949FF" />
        <Stop offset={1} stopColor="#876DFF" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_2136_29685"
        x1={312.465}
        y1={91.2018}
        x2={297.696}
        y2={85.2279}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6949FF" />
        <Stop offset={1} stopColor="#876DFF" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_2136_29685"
        x1={360.09}
        y1={113.129}
        x2={339.739}
        y2={97.7806}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6949FF" />
        <Stop offset={1} stopColor="#876DFF" />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_2136_29685"
        x1={293.321}
        y1={150.9}
        x2={275.056}
        y2={138.1}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6949FF" />
        <Stop offset={1} stopColor="#876DFF" />
      </LinearGradient>
      <LinearGradient
        id="paint5_linear_2136_29685"
        x1={290.998}
        y1={48.6099}
        x2={273.918}
        y2={34.2664}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6949FF" />
        <Stop offset={1} stopColor="#876DFF" />
      </LinearGradient>
      <LinearGradient
        id="paint6_linear_2136_29685"
        x1={347.859}
        y1={51.0226}
        x2={332.014}
        y2={40.3258}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6949FF" />
        <Stop offset={1} stopColor="#876DFF" />
      </LinearGradient>
      <LinearGradient
        id="paint7_linear_2136_29685"
        x1={345.86}
        y1={150.125}
        x2={331.309}
        y2={143.639}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6949FF" />
        <Stop offset={1} stopColor="#876DFF" />
      </LinearGradient>
      <LinearGradient
        id="paint8_linear_2136_29685"
        x1={266.981}
        y1={110.273}
        x2={243.031}
        y2={101.546}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6949FF" />
        <Stop offset={1} stopColor="#876DFF" />
      </LinearGradient>
      <ClipPath id="clip0_2136_29685">
        <Path
          d="M0 40C0 21.144 0 11.716 5.858 5.858 11.716 0 21.144 0 40 0h302c18.856 0 28.284 0 34.142 5.858C382 11.716 382 21.144 382 40v90c0 18.856 0 28.284-5.858 34.142C370.284 170 360.856 170 342 170H40c-18.856 0-28.284 0-34.142-5.858C0 158.284 0 148.856 0 130V40z"
          fill="#fff"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default PlayQuizBackground;
