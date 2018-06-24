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
