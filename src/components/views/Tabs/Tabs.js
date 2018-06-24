import { Navigation } from "react-native-navigation";
import { HOME_SCREEN, ADDPOST_SCREEN } from "../../../config/routes";
import CircleIcon from "../../../assets/images/circle.png";

const LoadTabs = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: HOME_SCREEN,
        label: "Home",
        title: "Home",
        icon: CircleIcon
      },
      {
        screen: ADDPOST_SCREEN,
        label: "Sell it",
        title: "Sell it",
        icon: CircleIcon
      }
    ]
  });
};

export default LoadTabs;
