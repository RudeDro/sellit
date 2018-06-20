import { Navigation } from "react-native-navigation";
import { LOGIN_SCREEN, HOME_SCREEN, ADDPOST_SCREEN } from "./src/config/routes";

import LoginScreen from "./src/screens/Login/LoginScreen";
import HomeScreen from "./src/screens/Home/HomeScreen";
import AddPostScreen from "./src/screens/AddPost/AddPostScreen";

Navigation.registerComponent(LOGIN_SCREEN, () => LoginScreen);
Navigation.registerComponent(HOME_SCREEN, () => HomeScreen);
Navigation.registerComponent(ADDPOST_SCREEN, () => AddPostScreen);

export default () =>
  Navigation.startSingleScreenApp({
    screen: {
      screen: LOGIN_SCREEN,
      title: "Login",
      navigatorStyle: {
        navBarHidden: true
      }
    }
  });
