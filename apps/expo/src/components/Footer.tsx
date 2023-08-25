import { View, Text, TouchableOpacity } from "react-native";
import HomeBoldIcon from "../icons/footer/HomeBoldIcon";
import CategoryIcon from "../icons/footer/CategoryIcon";
import LogoIcon from "../icons/footer/LogoIcon";
import CreateNewIcon from "../icons/footer/CreateNewIcon";
import ProfileIcon from "../icons/footer/ProfileIcon";
import HomeIndicatorIcon from "../icons/footer/HomeIndicatorIcon";

interface FooterProps {
  activeMenu: FooterActiveMenu;
  component: FooterComponent;
  onMenuSelect?: (selectedMenu: FooterActiveMenu) => void;
}

enum FooterActiveMenu {
  LightHome = "Light_Home",
  LightLibrary = "Light_Library",
  LightCreate = "Light_Create",
  LightProfile = "Light_Profile",
  DarkHome = "Dark_Home",
  DarkLibrary = "Dark_Library",
  DarkCreate = "Dark_Create",
  DarkProfile = "Dark_Profile",
}

enum FooterComponent {
  BottomBars = "Bottom_Bars",
}

const Footer = (props: FooterProps) => {
  const handleIconPress = (selectedMenu: FooterActiveMenu) => {
    if (props.onMenuSelect) {
      props.onMenuSelect(selectedMenu);
    }
  };
  const isDarkBackground = [
    FooterActiveMenu.DarkProfile,
    FooterActiveMenu.DarkCreate,
    FooterActiveMenu.DarkLibrary,
    FooterActiveMenu.DarkHome,
  ].includes(props.activeMenu);

  const backgroundColor = isDarkBackground ? "bg-gray-800" : "bg-white";
  return (
    <View
      className={`w-96 items-center rounded-t-lg border-t-2 border-gray-200 pt-2 ${backgroundColor}`}
    >
      <View className="h-12 flex-row items-center justify-center space-x-5 px-8">
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => handleIconPress(FooterActiveMenu.LightHome)}
        >
          <View className="flex-col items-center space-y-1">
            <HomeBoldIcon />
            <Text className="w-full text-center text-xs font-bold tracking-wider text-gray-500">
              Home
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => handleIconPress(FooterActiveMenu.LightLibrary)}
        >
          <View className="flex-col items-center space-y-1">
            <CategoryIcon />
            <Text className="w-full text-center text-xs font-medium tracking-wider text-gray-500">
              Library
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => handleIconPress(FooterActiveMenu.LightCreate)}
        >
          <View className="flex-col items-center space-y-1">
            <View className="items-center justify-center space-x-1 rounded-full bg-red-500 p-1">
              <LogoIcon type="LogoIcon_Default" component="LogoIcon" />
            </View>
            <Text className="w-full text-center text-xs font-medium tracking-wider text-gray-500">
              Join
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => handleIconPress(FooterActiveMenu.LightCreate)}
        >
          <View className="flex-col items-center space-y-1">
            <CreateNewIcon />
            <Text className="w-full text-center text-xs font-medium tracking-wider text-gray-500">
              Create
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => handleIconPress(FooterActiveMenu.LightProfile)}
        >
          <View className="flex-col items-center space-y-1">
            <ProfileIcon />
            <Text className="w-full text-center text-xs font-medium tracking-wider text-gray-500">
              Profile
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <HomeIndicatorIcon />
    </View>
  );
};

export default Footer;
