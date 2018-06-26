import { Navigation } from "react-native-navigation";
import ConfigureStore from "./src/components/Store/config";
import { Provider } from "react-redux";
import {
  LOGIN_SCREEN,
  HOME_SCREEN,
  ADDPOST_SCREEN,
  SIDEDRAWER,
  USER_POSTS,
  ARTICLE,
  NOT_LOGGED_IN
} from "./src/config/routes";

import LoginScreen from "./src/components/views/Login/LoginScreen";
import HomeScreen from "./src/components/views/Home/HomeScreen";
import AddPostScreen from "./src/components/views/AddPost/AddPostScreen";
import Sidedrawer from "./src/components/views/Sidedrawer/Sidedrawer";
import UserPostsScreen from "./src/components/views/UserPosts/UserPosts";
import ArticleScreen from "./src/components/views/Article/ArticleScreen";
import NotLoggedInScreen from "./src/components/views/AddPost/NotLoggedInScreen";

const store = ConfigureStore();

Navigation.registerComponent(LOGIN_SCREEN, () => LoginScreen, store, Provider);
Navigation.registerComponent(HOME_SCREEN, () => HomeScreen, store, Provider);
Navigation.registerComponent(
  ADDPOST_SCREEN,
  () => AddPostScreen,
  store,
  Provider
);
Navigation.registerComponent(SIDEDRAWER, () => Sidedrawer, store, Provider);
Navigation.registerComponent(
  USER_POSTS,
  () => UserPostsScreen,
  store,
  Provider
);
Navigation.registerComponent(ARTICLE, () => ArticleScreen, store, Provider);
Navigation.registerComponent(
  NOT_LOGGED_IN,
  () => NotLoggedInScreen,
  store,
  Provider
);

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
