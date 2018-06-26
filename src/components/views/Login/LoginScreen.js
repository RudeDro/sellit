import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { autoSignIn } from "../../Store/actions/UserActions";
import { bindActionCreators } from "redux";

import LoadTabs from "../Tabs/Tabs";
import Logo from "./Logo";
import LoginPanel from "./LoginPanel";

import {
  getOrientation,
  setOrientationListener,
  removeOrientationListener,
  getPlatform,
  getTokens,
  setTokens
} from "../../utils/Misc";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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

  componentDidMount() {
    getTokens(values => {
      if (values[0][1] === null) {
        this.setState({ loading: false });
      } else {
        this.props.autoSignIn(values[1][1]).then(() => {
          if (!this.props.User.userData.token) {
            this.setState({ loading: false });
          } else {
            setTokens(this.props.User.userData, () => {
              LoadTabs(true);
            });
          }
        });
      }
    });
  }

  showLogin = () => {
    this.setState({
      logoAnimation: true
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

function mapStateToProps(state) {
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ autoSignIn }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
