import React, { Component } from "react";
import { StyleSheet, View, Text, Animated, Image } from "react-native";
import BackImage from "../../../assets/images/loginPanel.jpg";
import LoginForm from "./LoginForm";

export default class LoginPanel extends Component {
  state = {
    animFinished: false,
    backImage: new Animated.Value(0),
    inputForm: new Animated.Value(0)
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.show && !this.state.animFinished) {
      Animated.parallel([
        Animated.timing(this.state.backImage, {
          toValue: 1,
          duration: 1000
        }),
        Animated.timing(this.state.inputForm, {
          toValue: 1,
          duration: 1500
        })
      ]).start(
        this.setState({
          animFinished: true
        })
      );
    }
  }

  render() {
    return (
      <View>
        <Animated.View
          style={{
            opacity: this.state.backImage
          }}
        >
          <Image
            style={
              this.props.orientation === "portrait"
                ? styles.imagePortrait
                : styles.imageLandscape
            }
            source={BackImage}
            resizeMode={"contain"}
          />
        </Animated.View>
        <Animated.View
          style={{
            opacity: this.state.inputForm,
            top: this.state.inputForm.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 30]
            })
          }}
        >
          <LoginForm platform={this.props.platform} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imagePortrait: {
    width: 270,
    height: 150
  },
  imageLandscape: {
    height: 0
  }
});
