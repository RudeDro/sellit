import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Linking
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ArticleScreen = props => {
  const openEmail = () => {
    Linking.openURL(
      `mailto:${props.Article.email}?subject=Regarding ${props.Article.title}`
    );
  };

  const articleImage = () => (
    <View style={{ position: "relative" }}>
      <Image
        resizeMode="cover"
        style={styles.articleImage}
        source={{
          uri: "https://loremflickr.com/400/400/girl,dog,brazil"
        }}
      />
      <Text style={styles.priceTag}>{props.Article.price} €</Text>
    </View>
  );

  const articleText = () => (
    <View>
      <Text style={styles.articleTitle}>{props.Article.title}</Text>
      <Text style={styles.articleDescription}>{props.Article.description}</Text>
    </View>
  );

  const ownerInfo = () => (
    <View style={styles.ownerInfo}>
      <Text>Contact the owner of this article to the following mail:</Text>
      <Icon.Button
        name="envelope-o"
        color="#00ADA9"
        backgroundColor="#ffffff"
        onPress={() => {
          openEmail();
        }}
      >
        <Text style={{ fontSize: 20 }}>{props.Article.email}</Text>
      </Icon.Button>
    </View>
  );

  return (
    <ScrollView style={styles.articleContainer}>
      {articleImage()}
      {articleText()}
      {ownerInfo()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    padding: 10
  },
  articleImage: {
    width: "100%",
    height: 250
  },
  priceTag: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FF6444",
    padding: 10,
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "Roboto-Black"
  },
  articleTitle: {
    fontSize: 30,
    color: "#474143",
    fontFamily: "Roboto-Black",
    marginTop: 20
  },
  articleDescription: {
    fontSize: 18,
    marginTop: 20
  },
  ownerInfo: {
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "lightgrey"
  }
});

export default ArticleScreen;
