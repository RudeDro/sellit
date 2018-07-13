import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

const BlockItem = props => {
  const itemImage = item => (
    <View>
      <Image
        resizeMode="cover"
        style={styles.itemImage}
        source={{
          uri: item.imageKey
            ? "https://loremflickr.com/400/400/" + item.imageKey
            : "https://loremflickr.com/400/400/girl,dog,brazil"
        }}
      />
    </View>
  );

  const itemText = item => (
    <View style={styles.itemTextContainer}>
      <Text style={styles.itemTextTitle}>{item.title}</Text>
      <Text style={styles.itemTextPrice}>{item.price} €</Text>
    </View>
  );

  const block = ({ item, i }) => (
    <View style={styles.blockRow}>
      <TouchableOpacity
        onPress={() => props.goToArticleHandler(item.blockOne)}
        style={{ flex: 2 }}
      >
        <View
          style={[
            styles.blockGridItemContainer,
            styles.blockGridItemContainerLeft
          ]}
        >
          {itemImage(item.blockOne)}
          {itemText(item.blockOne)}
        </View>
      </TouchableOpacity>
      {item.blockTwo ? (
        <TouchableOpacity
          onPress={() => props.goToArticleHandler(item.blockTwo)}
          style={{ flex: 2 }}
        >
          <View
            style={[
              styles.blockGridItemContainer,
              styles.blockGridItemContainerRight
            ]}
          >
            {itemImage(item.blockTwo)}
            {itemText(item.blockTwo)}
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return <View>{block(props)}</View>;
};

const styles = StyleSheet.create({
  blockRow: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "space-between"
  },
  itemImage: {
    width: "100%",
    height: 200
  },
  itemTextContainer: {
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50"
  },
  itemTextTitle: {
    fontFamily: "Roboto-Black",
    color: "#4c4c4c",
    marginBottom: 5
  },
  itemTextPrice: {
    fontFamily: "Roboto-Black",
    color: "#00ADA9",
    marginBottom: 5
  },
  blockGridItemContainer: {
    backgroundColor: "#f1f1f1"
  },
  blockGridItemContainerLeft: {
    marginRight: 2
  },
  blockGridItemContainerRight: {
    marginLeft: 2.5
  }
});

export default BlockItem;
