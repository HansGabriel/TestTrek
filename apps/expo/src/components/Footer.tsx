import React from "react";
import IconlyBoldHome from "../icons/HomeIcon";
import IconlyLightOutlineCategory from "../icons/CategoryIcon";
import Logo from "../icons/LogoIcon";
import IconlyLightOutlinePlus from "../icons/CreateNewIcon";
import IconlyLightOutlineProfile from "../icons/ProfileIcon";
import HomeIndicator from "../icons/HomeIndicatorIcon";

export interface BottomBarsProps {
  activeMenu: BottomBarsActiveMenu;
  component: BottomBarsComponent;
}

export enum BottomBarsActiveMenu {
  LightHome = "Light_Home",
  LightLibrary = "Light_Library",
  LightCreate = "Light_Create",
  LightProfile = "Light_Profile",
  DarkHome = "Dark_Home",
  DarkLibrary = "Dark_Library",
  DarkCreate = "Dark_Create",
  DarkProfile = "Dark_Profile",
}

export enum BottomBarsComponent {
  BottomBars = "Bottom_Bars",
}

export function Footer(props: BottomBarsProps) {
  const isActive = (activeMenu: BottomBarsActiveMenu) =>
    props.activeMenu === activeMenu &&
    props.component === BottomBarsComponent.BottomBars;

  return (
    <View
      className={`flex flex-col items-center border-t border-gray-300 bg-white pt-2 ${
        isActive(BottomBarsActiveMenu.DarkProfile) &&
        "bg-opacity-85 border-dark-3 bg-dark-dark-3 border-t backdrop-blur-[10px]"
      } rounded-t-lg`}
    >
      <View className="flex h-12 w-full items-center justify-center gap-5 px-8">
        <TouchableOpacity className="flex flex-grow flex-col items-center gap-0.5">
          <IconlyBoldHome />
          <Text
            className={`text-dark-4 font-nunito text-center text-sm font-bold ${
              isActive(BottomBarsActiveMenu.LightLibrary) &&
              "font-medium text-gray-500"
            } ${isActive(BottomBarsActiveMenu.DarkHome) && "text-gray-100"} ${
              isActive(BottomBarsActiveMenu.DarkLibrary) &&
              "font-medium text-gray-500"
            }`}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-grow flex-col items-center gap-0.5">
          <IconlyLightOutlineCategory />
          <Text
            className={`font-nunito text-center text-sm font-medium text-gray-500 ${
              isActive(BottomBarsActiveMenu.LightLibrary) &&
              "text-dark-4 font-bold"
            } ${
              isActive(BottomBarsActiveMenu.DarkLibrary) &&
              "font-bold text-gray-100"
            }`}
          >
            Library
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-grow flex-col items-center gap-0.5">
          <View className="bg-primary-500 flex items-center justify-center gap-1 rounded-full p-1">
            <Logo type="Logo_Default" component="Logo" />
          </View>
          <Text className="font-nunito w-full text-center text-sm font-medium text-gray-500">
            Join
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-grow flex-col items-center gap-0.5">
          <IconlyLightOutlinePlus />
          <Text
            className={`font-nunito text-center text-sm font-medium text-gray-500 ${
              isActive(BottomBarsActiveMenu.LightCreate) &&
              "text-dark-4 font-bold"
            } ${
              isActive(BottomBarsActiveMenu.DarkCreate) &&
              "font-bold text-gray-100"
            }`}
          >
            Create
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-grow flex-col items-center gap-0.5">
          <IconlyLightOutlineProfile />
          <Text
            className={`font-nunito text-center text-sm font-medium text-gray-500 ${
              isActive(BottomBarsActiveMenu.LightProfile) &&
              "text-dark-4 font-bold"
            } ${
              isActive(BottomBarsActiveMenu.DarkProfile) &&
              "font-bold text-gray-100"
            }`}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
      <HomeIndicator />
    </View>
  );
}
