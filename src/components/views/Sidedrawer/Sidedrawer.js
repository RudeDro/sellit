import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";

import Icon from "react-native-vector-icons/FontAwesome";
import {
  HOME_SCREEN,
  ADDPOST_SCREEN,
  USER_POSTS
} from "../../../config/routes";

class Sidedrawer extends Component {
  state = {
    buttons: [
      {
        value: "Home",
        iconName: "home",
        shouldGoTo: HOME_SCREEN,
        linkType: "tab",
        index: 0,
        privacy: false
      },
      {
        value: "Sell",
        iconName: "dollar",
        shouldGoTo: ADDPOST_SCREEN,
        linkType: "tab",
        index: 1,
        privacy: false
      },
      {
        value: "My posts",
        iconName: "th-list",
        shouldGoTo: USER_POSTS,
        linkType: "view",
        index: null,
        privacy: true
      }
    ]
  };

  button = button => (
    <Icon.Button
      key={button.value}
      name={button.iconName}
      backgroundColor="#474143"
      iconStyle={{ width: 15 }}
      color="#ffffff"
      size={18}
      onPress={() => {
        this.props.navigator.handleDeepLink({
          link: button.shouldGoTo,
          payload: {
            linkType: button.linkType,
            linkIndex: button.index
          }
        });
      }}
    >
      <Text style={styles.buttonText}>{button.value}</Text>
    </Icon.Button>
  );

  showButtons = buttons =>
    buttons.map(
      button =>
        !button.privacy
          ? this.button(button)
          : this.props.User.userData
            ? this.button(button)
            : null
    );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {this.showButtons(this.state.buttons)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#474143"
  },
  buttonContainer: {
    padding: 10,
    marginTop: 20
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#ffffff"
  }
});

function mapStateToProps(state) {
  return {
    User: state.User
  };
}

export default connect(
  mapStateToProps,
  null
)(Sidedrawer);
