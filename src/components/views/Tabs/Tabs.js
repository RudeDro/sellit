import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  HOME_SCREEN,
  ADDPOST_SCREEN,
  SIDEDRAWER,
  NOT_LOGGED_IN
} from "../../../config/routes";
import CircleIcon from "../../../assets/images/circle.png";

const navStyle = {
  navBarTextFontSize: 20,
  navBarTextColor: "#ffffff",
  navBarTextFontFamily: "RobotoCondensed-Bold",
  navBarTitleTextCentered: true, // Android only
  navBarBackgroundColor: "#00ADA9"
};

const navLeftButton = sources => {
  return {
    title: "Drawer",
    id: "DrawerButton",
    icon: sources[0],
    disableIconTint: true,
    buttonColor: "white"
  };
};

const LoadTabs = loggedIn => {
  Promise.all([
    Icon.getImageSource("bars", 20, "white"),
    Icon.getImageSource("dollar", 20, "white"),
    Icon.getImageSource("search", 20, "white")
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: HOME_SCREEN,
          label: "Home",
          title: "Home",
          icon: sources[2],
          navigatorStyle: navStyle,
          navigatorButtons: {
            leftButtons: [navLeftButton(sources)]
          }
        },
        {
          screen: loggedIn ? ADDPOST_SCREEN : NOT_LOGGED_IN,
          label: "Sell it",
          title: "Sell it",
          icon: sources[1],
          navigatorStyle: navStyle,
          navigatorButtons: {
            leftButtons: [navLeftButton(sources)]
          }
        }
      ],
      tabsStyle: {
        tabBarButtonColor: "grey",
        tabBarSelectedButtonColor: "#FFC636",
        tabBarTextFontFamily: "RobotoCondensed-Bold",
        tabBarBackgroundColor: "white",
        tabBarTranslucent: false
      },
      appStyle: {
        tabBarButtonColor: "grey",
        tabBarSelectedButtonColor: "#FFC636",
        tabBarTextFontFamily: "RobotoCondensed-Bold",
        tabBarBackgroundColor: "white",
        navBarButtonColor: "#ffffff",
        keepStyleAcrossPush: true
      },
      drawer: {
        left: {
          screen: SIDEDRAWER,
          fixedWidth: 500
        }
      }
    });
  });
};

export default LoadTabs;
