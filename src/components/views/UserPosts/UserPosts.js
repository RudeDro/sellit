import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
  Modal
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserPosts, deleteUserPost } from "../../Store/actions/UserActions";

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
      posts: [],
      modal: false
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

  showConfirm = postId => {
    this.setState({
      modal: true,
      toDeletePostId: postId
    });
  };

  deletePost = postId => {
    this.props.deleteUserPost(postId, this.props.User.userData).then(() => {
      const userId = this.props.User.userData.uid;
      this.props.getUserPosts(userId);

      this.setState({
        modal: false,
        toDeletePostId: ""
      });
    });
  };

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
              <TouchableOpacity onPress={() => this.showConfirm(post.id)}>
                <Text
                  style={{
                    fontFamily: "Roboto-Black",
                    color: "#C51162",
                    paddingBottom: 10
                  }}
                >
                  Delete Post
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modal}
              onRequestClose={() => {}}
            >
              <View style={{ padding: 50 }}>
                <Text style={{ fontSize: 20 }}>
                  Are you sure you want to delete the post?
                </Text>
                <View style={{ marginTop: 50 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.deletePost(this.state.toDeletePostId);
                    }}
                  >
                    <Text style={styles.modalDelete}>Yes, delete it</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ modal: false });
                    }}
                  >
                    <Text style={styles.modalCancel}>Nope</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
  },
  modalDelete: {
    marginBottom: 20,
    alignSelf: "center",
    fontSize: 20,
    color: "#C51162"
  },
  modalCancel: {
    marginBottom: 20,
    alignSelf: "center",
    fontSize: 20,
    color: "#00ADA9"
  }
});

function mapStateToProps(state) {
  console.log(state);
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUserPosts, deleteUserPost }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPostsScreen);
