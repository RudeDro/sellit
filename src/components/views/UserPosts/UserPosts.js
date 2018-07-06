import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserPosts } from "../../Store/actions/UserActions";

class UserPostsScreen extends Component {
  static navigatorButtons = {
    leftButtons:
      Platform.OS === "ios"
        ? [
            {
              title: "GO back",
              id: "goBack"
            }
          ]
        : null
  };

  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };

    if (Platform.OS === "ios") {
      this.props.navigator.setOnNavigatorEvent(event => {
        if (event.id === "goBack") {
          this.props.navigator.dismissAllModals({
            animationType: "slide-down"
          });
        }
      });
    }
  }

  componentDidMount() {
    const userId = this.props.User.userData.uid;
    this.props.getUserPosts(userId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.User.userPosts) {
      this.setState({
        posts: nextProps.User.userPosts
      });
    }
  }

  showPosts = posts =>
    posts
      ? posts.map(post => (
          <View style={styles.itemWrapper} key={post.id}>
            <View style={styles.itemTitle}>
              <Text style={{ fontFamily: "Roboto-Black" }}>{post.title}</Text>
            </View>

            <View style={styles.itemDescription}>
              <Text>{post.description}</Text>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.small}>Price: {post.price} €</Text>
                <Text style={styles.small}>Category: {post.category}</Text>
              </View>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => alert("delete")}>
                <Text
                  style={{
                    fontFamily: "Roboto-Black",
                    color: "#f44336",
                    paddingBottom: 10
                  }}
                >
                  Delete Post
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      : null;

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              marginBottom: 30
            }}
          >
            <Text>You have {this.state.posts.length} posts</Text>
          </View>

          {this.showPosts(this.state.posts)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  itemWrapper: {
    borderWidth: 1,
    borderColor: "#ececec",
    borderRadius: 2,
    marginBottom: 20
  },
  itemTitle: {
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    padding: 10,
    backgroundColor: "#f5f5f5"
  },
  itemDescription: {
    padding: 10
  },
  small: {
    fontSize: 12
  },
  buttons: {
    alignItems: "center"
  }
});

function mapStateToProps(state) {
  console.log(state);
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserPosts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPostsScreen);
