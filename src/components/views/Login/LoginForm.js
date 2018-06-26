import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { signUp, signIn } from "../../Store/actions/UserActions";
import { bindActionCreators } from "redux";

import Input from "../../utils/forms/Input";
import ValidationRules from "../../utils/forms/ValidationRules";
import LoadTabs from "../Tabs/Tabs";
import { setTokens } from "../../utils/Misc";

class LoginForm extends Component {
  state = {
    type: "login",
    action: "Login",
    actionMode: "Not a user, Register",
    hasErrors: false,
    form: {
      email: {
        value: "",
        valid: false,
        type: "text",
        rules: {
          isEmail: true,
          isRequired: true
        }
      },
      password: {
        value: "",
        valid: false,
        type: "text",
        rules: {
          minLength: 6,
          isRequired: true
        }
      },
      confirmPassword: {
        value: "",
        valid: false,
        type: "text",
        rules: {
          confirmPass: "password"
        }
      }
    }
  };

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false
    });

    let formCopy = this.state.form;
    formCopy[name].value = value;

    let rules = formCopy[name].rules;
    let valid = ValidationRules(value, rules, formCopy);

    formCopy[name].valid = valid;

    this.setState({
      form: formCopy
    });
  };

  confirmPassword = () =>
    this.state.type != "login" ? (
      <Input
        placeholder="Confirm your password"
        type={this.state.form.confirmPassword.type}
        value={this.state.form.confirmPassword.value}
        onChangeText={value => this.updateInput("confirmPassword", value)}
        secureTextEntry
      />
    ) : null;

  changeFormType = () => {
    const type = this.state.type;
    this.setState({
      type: type === "login" ? "register" : "login",
      action: type === "login" ? "Register" : "Login",
      actionMode:
        type === "login" ? "Not registered, login" : "Not a user, Register"
    });
  };

  formHasErrors = () =>
    this.state.hasErrors ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Oops, Check your info</Text>
      </View>
    ) : null;

  manageAccess = () => {
    if (!this.props.User.userData.uid) {
      this.setState({
        hasErrors: true
      });
    } else {
      setTokens(this.props.User.userData, () => {
        this.setState({
          hasErrors: false
        });
        LoadTabs(true);
      });
    }
  };

  submitUser = () => {
    let isFormValid = true;
    let formToSubmit = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      if (this.state.type === "login") {
        if (key !== "confirmPassword") {
          isFormValid = isFormValid && formCopy[key].valid;
          formToSubmit[key] = formCopy[key].value;
        }
      } else {
        isFormValid = isFormValid && formCopy[key].valid;
        formToSubmit[key] = formCopy[key].value;
      }
    }

    if (isFormValid) {
      if (this.state.type === "login") {
        this.props.signIn(formToSubmit).then(() => {
          this.manageAccess();
        });
      } else {
        this.props.signUp(formToSubmit).then(() => {
          this.manageAccess();
        });
      }
    } else {
      this.setState({
        hasErrors: true
      });
    }
  };

  render() {
    return (
      <View style={styles.formInputContainer}>
        <Input
          placeholder="Enter your email"
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          onChangeText={value => this.updateInput("email", value)}
          autoCapitalize={"none"}
          keyboardType={"email-address"}
        />

        <Input
          placeholder="Password"
          type={this.state.form.password.type}
          value={this.state.form.password.value}
          onChangeText={value => this.updateInput("password", value)}
          secureTextEntry
        />

        {this.confirmPassword()}
        {this.formHasErrors()}

        <View
          style={
            this.props.platform === "android"
              ? styles.buttonAndroid
              : styles.buttonIos
          }
        >
          <Button
            title={this.state.action}
            color="#fd9727"
            onPress={this.submitUser}
          />
        </View>
        <View
          style={
            this.props.platform === "android"
              ? styles.buttonAndroid
              : styles.buttonIos
          }
        >
          <Button
            title={this.state.actionMode}
            color="lightgrey"
            onPress={this.changeFormType}
          />
        </View>
        <View>
          <Button
            title="i'll do it later"
            color="lightgrey"
            onPress={() => LoadTabs(false)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formInputContainer: {
    minHeight: 400
  },
  buttonAndroid: {
    marginBottom: 10,
    marginTop: 10
  },
  buttonIos: {},
  errorContainer: {
    marginBottom: 20,
    marginTop: 10
  },
  errorText: {
    color: "#C51162",
    fontFamily: "Roboto-Black"
  }
});

function mapStateToProps(state) {
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUp, signIn }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
