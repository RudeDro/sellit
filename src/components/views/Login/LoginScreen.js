import React, { Component } from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import LoadTabs from "../Tabs/Tabs";
import Logo from "./Logo";
import LoginPanel from "./LoginPanel";

import {
  getOrientation,
  setOrientationListener,
  removeOrientationListener,
  getPlatform
} from "../../utils/Misc";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: getPlatform(),
      orientation: getOrientation(),
      logoAnimation: false
    };

    setOrientationListener(this.changeOrientation);
  }

  changeOrientation = () => {
    this.setState({
      orientation: getOrientation()
    });
  };

  componentWillUnmount() {
    removeOrientationListener();
  }

  showLogin = () => {
    this.setState({
      logoAnimation: true
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Logo
            orientation={this.state.orientation}
            showLogin={this.showLogin}
          />
          <LoginPanel
            show={this.state.logoAnimation}
            orientation={this.state.orientation}
            platform={this.state.platform}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
