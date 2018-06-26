import { Dimensions, Platform, AsyncStorage } from "react-native";

export const getOrientation = () => {
  return Dimensions.get("window").height > Dimensions.get("window").width
    ? "portrait"
    : "landscape";
};

export const setOrientationListener = callback => {
  return Dimensions.addEventListener("change", callback);
};

export const removeOrientationListener = () => {
  return Dimensions.removeEventListener("change");
};

export const getPlatform = () => {
  if (Platform.OS === "ios") {
    return "ios";
  } else {
    return "android";
  }
};

export const setTokens = (values, callback) => {
  const dateNow = new Date();
  const expiration = dateNow.getTime() + 3600 * 1000;

  AsyncStorage.multiSet([
    ["@sellit.token", values.token],
    ["@sellit.refreshToken", values.refToken],
    ["@sellit.expireToken", expiration.toString()],
    ["@sellit.uid", values.uid]
  ]).then(response => {
    callback();
  });
};

export const getTokens = callback => {
  AsyncStorage.multiGet([
    "@sellit.token",
    "@sellit.refreshToken",
    "@sellit.expireToken",
    "@sellit.uid"
  ]).then(values => {
    callback(values);
  });
};

export const navigatorDrawer = (event, $this) => {
  if (event.type === "NavBarButtonPress" && event.id === "DrawerButton") {
    $this.props.navigator.toggleDrawer({
      side: "left",
      animated: true
    });
  }
};

export const navigatorDeepLink = (event, $this) => {
  if (event.type === "DeepLink") {
    $this.props.navigator.toggleDrawer({
      side: "left",
      animated: true
    });

    if (event.payload.linkType === "tab") {
      $this.props.navigator.switchToTab({
        tabIndex: event.payload.linkIndex
      });
    } else {
      $this.props.navigator.showModal({
        screen: event.link,
        animationType: "slide-horizontal",
        navigatorStyle: {
          navBarBackgroundColor: "#00ADA9",
          screenBackgroundColor: "#ffffff"
        },
        backButtonHidden: false
      });
    }
  }
};

export const gridTwoColumns = list => {
  let newList = [];
  let listCopy = list;
  let count = 1;
  let vessel = {};

  if (listCopy) {
    listCopy.forEach(element => {
      if (count == 1) {
        vessel["blockOne"] = element;
        count++;
      } else {
        vessel["blockTwo"] = element;
        newList.push(vessel);

        count = 1;
        vessel = {};
      }
    });

    if (vessel.blockOne) {
      newList.push(vessel);
    }
  }

  return newList;
};
