import React, { Component } from "react";
import { View, Text } from "react-native";
import { navigatorDrawer } from "../../utils/Misc";

export default class AddPostScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(event => {
      navigatorDrawer(event, this);
    });
  }

  render() {
    return <Text> Add post </Text>;
  }
}
