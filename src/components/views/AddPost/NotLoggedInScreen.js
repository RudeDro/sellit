import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Navigation } from "react-native-navigation";
import { LOGIN_SCREEN } from "../../../config/routes";
import { navigatorDrawer } from "../../utils/Misc";

export default class NotLoggedInScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(event => {
      navigatorDrawer(event, this);
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon name="frown-o" size={60} color="grey" />
        <Text style={styles.errorText}>
          You need to login or register to sell!
        </Text>
        <Button
          title="LOGIN / REGISTER"
          color="#FD9727"
          onPress={() => {
            Navigation.startSingleScreenApp({
              screen: {
                screen: LOGIN_SCREEN,
                title: "Login",
                navigatorStyle: {
                  navBarHidden: true
                }
              }
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorText: {
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Roboto-Black"
  }
});
