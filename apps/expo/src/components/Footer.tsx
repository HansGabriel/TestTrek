//Please edit this file.
import { View, Text } from "react-native";
import { IconlyBoldHome } from "../../components/IconlyBoldHome";
import { IconlyLightOutlineCategory } from "../../components/IconlyLightOutlineCategory";
import { Logo } from "../../components/Logo";
import { IconlyLightOutlinePlus } from "../../components/IconlyLightOutlinePlus";
import { IconlyLightOutlineProfile } from "../../components/IconlyLightOutlineProfile";
import { HomeIndicator } from "../../components/HomeIndicator";

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

export function BottomBars(props: BottomBarsProps) {
  const classes = {
    root: [
      styles.root,
      props.activeMenu === BottomBarsActiveMenu.DarkProfile &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.rootActiveMenuDarkProfileComponentBottomBars,
      props.activeMenu === BottomBarsActiveMenu.DarkCreate &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.rootActiveMenuDarkCreateComponentBottomBars,
      props.activeMenu === BottomBarsActiveMenu.DarkLibrary &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.rootActiveMenuDarkLibraryComponentBottomBars,
      props.activeMenu === BottomBarsActiveMenu.DarkHome &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.rootActiveMenuDarkHomeComponentBottomBars,
    ],
    home: [
      styles.home,
      props.activeMenu === BottomBarsActiveMenu.LightLibrary &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.homeActiveMenuLightLibraryComponentBottomBars,
      props.activeMenu === BottomBarsActiveMenu.DarkProfile &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.homeActiveMenuDarkProfileComponentBottomBars,
      props.activeMenu === BottomBarsActiveMenu.LightProfile &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.homeActiveMenuLightProfileComponentBottomBars,
      props.activeMenu === BottomBarsActiveMenu.DarkCreate &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.homeActiveMenuDarkCreateComponentBottomBars,
      props.activeMenu === BottomBarsActiveMenu.LightCreate &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.homeActiveMenuLightCreateComponentBottomBars,
      props.activeMenu === BottomBarsActiveMenu.DarkLibrary &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.homeActiveMenuDarkLibraryComponentBottomBars,
      props.activeMenu === BottomBarsActiveMenu.DarkHome &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.homeActiveMenuDarkHomeComponentBottomBars,
    ],
    library: [
      styles.library,
      props.activeMenu === BottomBarsActiveMenu.LightLibrary &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.libraryActiveMenuLightLibraryComponentBottomBars,
      props.activeMenu === BottomBarsActiveMenu.DarkLibrary &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.libraryActiveMenuDarkLibraryComponentBottomBars,
    ],
    create: [
      styles.create,
      props.activeMenu === BottomBarsActiveMenu.DarkCreate &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.createActiveMenuDarkCreateComponentBottomBars,
      props.activeMenu === BottomBarsActiveMenu.LightCreate &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.createActiveMenuLightCreateComponentBottomBars,
    ],
    profile: [
      styles.profile,
      props.activeMenu === BottomBarsActiveMenu.DarkProfile &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.profileActiveMenuDarkProfileComponentBottomBars,
      props.activeMenu === BottomBarsActiveMenu.LightProfile &&
        props.component === BottomBarsComponent.BottomBars &&
        styles.profileActiveMenuLightProfileComponentBottomBars,
    ],
  };

  return (
    <View
      className={`w-[430px] flex-col items-center pt-2 ${rootClasses.join(
        " ",
      )}`}
    >
      <View className="gap-4.75 h-12 flex-row items-center px-8 py-0">
        <IconlyBoldHome />
        <Text style={classes.home}>Home</Text>
      </View>
      <View style={styles.autoLayoutVertical2}>
        <IconlyLightOutlineCategory />
        <Text style={classes.library}>Library</Text>
      </View>
      <View style={styles.autoLayoutVertical3}>
        <View style={styles.frame10626}>
          <Logo type="Logo_Default" component="Logo" />
        </View>
        <Text style={styles.join}>Join</Text>
      </View>
      <View style={styles.autoLayoutVertical4}>
        <IconlyLightOutlinePlus />
        <Text style={classes.create}>Create</Text>
      </View>
      <View style={styles.autoLayoutVertical5}>
        <IconlyLightOutlineProfile />
        <Text style={classes.profile}>Profile</Text>
      </View>
      <HomeIndicator />
    </View>
  );
}
