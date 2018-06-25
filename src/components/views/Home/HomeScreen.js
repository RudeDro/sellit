import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { navigatorDrawer, navigatorDeepLink } from "../../utils/Misc";
import HorizontalScrollIcon from "./HorizontalScrollIcons";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: ["All", "Sports", "Music", "Clothing", "Electronics"],
      categorySelected: "All"
    };

    this.props.navigator.setOnNavigatorEvent(event => {
      navigatorDeepLink(event, this);
      navigatorDrawer(event, this);
    });
  }

  updateCategoryHandler = value => {
    this.setState({
      categorySelected: value
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HorizontalScrollIcon
            categories={this.state.categories}
            categorySelected={this.state.categorySelected}
            updateCategoryHandler={this.updateCategoryHandler}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5
  }
});
