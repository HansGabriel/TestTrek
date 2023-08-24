import { View } from "react-native";
import LogoSVG from "./svgs/LogoTemp.svg";

export interface LogoProps {
  type: LogoType;
  component: LogoComponent;
}

export enum LogoType {
  LogoDefault = "Logo_Default",
  LogoTextLight = "Logo_Text_Light",
  LogoTextDark = "Logo_Text_Dark",
}

export enum LogoComponent {
  Logo = "Logo",
}

export function LogoIcon(props: LogoProps) {
  const classes = {
    root: [
      "w-15 h-15 flex-shrink-0",
      props.type === LogoType.LogoTextDark &&
        props.component === LogoComponent.Logo &&
        "inline-flex items-center gap-3 flex-row",
      props.type === LogoType.LogoTextLight &&
        props.component === LogoComponent.Logo &&
        "inline-flex items-center gap-3 flex-row",
    ],
    quizzo: [
      "w-15 h-15 flex-shrink-0",
      props.type === LogoType.LogoTextDark &&
        props.component === LogoComponent.Logo &&
        "inline-flex items-center gap-3 flex-row",
      props.type === LogoType.LogoTextLight &&
        props.component === LogoComponent.Logo &&
        "inline-flex items-center gap-3 flex-row",
    ],
  };

  return (
    <View className={classes.root.join(" ")}>
      <LogoSVG />
    </View>
  );
}
