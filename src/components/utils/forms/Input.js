import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

const Input = props => {
  let template = null;
  switch (props.type) {
    case "text":
      template = (
        <TextInput
          underlineColorAndroid="transparent"
          {...props}
          style={[styles.input, props.overrideStyle]}
        />
      );
      break;

    default:
      return template;
  }

  return template;
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#eaeaea",
    fontSize: 18,
    padding: 5,
    marginTop: 10
  }
});

export default Input;
