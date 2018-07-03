import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  Modal
} from "react-native";

import { navigatorDrawer, getTokens, setTokens } from "../../utils/Misc";
import Input from "../../utils/forms/Input";
import ValidationRules from "../../utils/forms/ValidationRules";
import { addArticle, resetArticle } from "../../Store/actions/ArticleActions";
import { autoSignIn } from "../../Store/actions/UserActions";

class AddPostScreen extends Component {
  state = {
    loading: false,
    hasErrors: false,
    modalVisible: false,
    modalSuccess: false,
    errorsArray: [],
    form: {
      category: {
        value: "",
        name: "category",
        valid: false,
        type: "picker",
        options: ["Sports", "Music", "Clothing", "Electronics"],
        rules: {
          isRequired: true
        },
        errorMessage: "Please choose category"
      },
      title: {
        value: "",
        name: "title",
        valid: false,
        type: "text",
        rules: {
          isRequired: true,
          maxLength: 50
        },
        errorMessage: "Please enter a title, max of 50 char"
      },
      description: {
        value: "",
        name: "description",
        valid: false,
        type: "text",
        rules: {
          isRequired: true,
          maxLength: 200
        },
        errorMessage: "Please enter a description, max of 200 char"
      },
      price: {
        value: "",
        name: "price",
        valid: false,
        type: "text",
        rules: {
          isRequired: true,
          maxLength: 6
        },
        errorMessage: "Please enter a price, max of 6 char"
      },
      email: {
        value: "",
        name: "email",
        valid: false,
        type: "text",
        rules: {
          isRequired: true,
          isEmail: true
        },
        errorMessage: "Please enter a valid email"
      }
    }
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(event => {
      navigatorDrawer(event, this);
    });
  }

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

  submitFormHandler = () => {
    this.setState({
      loading: true
    });

    let isFormValid = true;
    let dataToSubmit = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      isFormValid = isFormValid && formCopy[key].valid;
      dataToSubmit[key] = this.state.form[key].value;
    }

    if (isFormValid) {
      this.setState({
        loading: true
      });

      getTokens(value => {
        const dateNow = new Date();
        const expiration = dateNow.getTime();
        const form = {
          ...dataToSubmit,
          uid: value[3][1]
        };

        if (expiration > value[2][1]) {
          this.props.autoSignIn(value[1][1]).then(() => {
            setTokens(this.props.User.userData, () => {
              this.props
                .addArticle(form, this.props.User.userData.token)
                .then(() => {
                  this.setState({
                    modalSuccess: true
                  });
                });
            });
          });
        } else {
          this.props.addArticle(form, value[0][1]).then(() => {
            this.setState({
              modalSuccess: true
            });
          });
        }
      });
    } else {
      let errorsArray = [];
      for (let key in formCopy) {
        if (!formCopy[key].valid) {
          errorsArray.push(formCopy[key].errorMessage);
        }
      }
      this.setState({
        loading: false,
        hasErrors: true,
        errorsArray,
        modalVisible: true
      });
    }
  };

  showErrorsArray = errors =>
    errors
      ? errors.map((item, i) => (
          <Text key={i} style={styles.errorText}>
            - {item}
          </Text>
        ))
      : null;

  clearErrors = () => {
    this.setState({
      hasErrors: false,
      errorsArray: [],
      modalVisible: false
    });
  };

  resetSellitScreen = () => {
    const formCopy = this.state.form;
    for (key in formCopy) {
      formCopy[key].valid = false;
      formCopy[key].value = "";
    }

    this.setState({
      modalSuccess: false,
      form: formCopy,
      errorsArray: [],
      loading: false
    });

    this.props.resetArticle();
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.formInputContainer}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.mainTitle}>Sell your things</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text>Select a category</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Input
                placeholder="Select a category"
                type={this.state.form.category.type}
                value={this.state.form.category.value}
                onValueChange={value => this.updateInput("category", value)}
                options={this.state.form.category.options}
              />
            </View>
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.secondTitle}>
              Describe what you are selling
            </Text>
          </View>

          <View>
            <Text>Please add the title, be descriptive</Text>
            <Input
              placeholder="Enter a title"
              type={this.state.form.title.type}
              value={this.state.form.title.value}
              onChangeText={value => this.updateInput("title", value)}
              overrideStyle={styles.inputText}
            />
          </View>

          <View>
            <Input
              placeholder="Enter the description"
              type={this.state.form.description.type}
              value={this.state.form.description.value}
              onChangeText={value => this.updateInput("description", value)}
              multiline={true}
              numberOfLines={4}
              overrideStyle={styles.inputTextMultiline}
            />
          </View>

          <View>
            <Text style={{ marginTop: 20 }}>
              Add here how much you want for the item
            </Text>
            <Input
              placeholder="Enter the price"
              type={this.state.form.price.type}
              value={this.state.form.price.value}
              onChangeText={value => this.updateInput("price", value)}
              overrideStyle={styles.inputText}
              keyboardType={"numeric"}
            />
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.secondTitle}>Add your contact data</Text>
          </View>

          <View>
            <Text>Please enter the email where users can contact you</Text>
          </View>
          <Input
            placeholder="Enter your email"
            type={this.state.form.email.type}
            value={this.state.form.email.value}
            onChangeText={value => this.updateInput("email", value)}
            overrideStyle={styles.inputText}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
          />

          {!this.state.loading ? (
            <Button
              title="Sell it"
              color="#4CAF50"
              onPress={this.submitFormHandler}
            />
          ) : null}

          <Modal
            animationType="slide"
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <View style={{ padding: 20 }}>
              {this.showErrorsArray(this.state.errorsArray)}
            </View>
            <Button
              title="Got it"
              onPress={() => {
                this.clearErrors();
              }}
            />
          </Modal>

          <Modal
            animationType="slide"
            visible={this.state.modalSuccess}
            onRequestClose={() => {}}
          >
            <View style={{ padding: 20 }}>
              <Text>Application submitted!</Text>
            </View>
            <Button
              title="Go back to Home"
              onPress={() => {
                this.resetSellitScreen();
                this.props.navigator.switchToTab({
                  tabIndex: 0
                });
              }}
            />
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formInputContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 20
  },
  mainTitle: {
    fontFamily: "Roboto-Black",
    fontSize: 30,
    color: "#00ADA9"
  },
  secondTitle: {
    fontFamily: "Roboto-Black",
    fontSize: 20,
    color: "#00ADA9",
    marginTop: 30,
    marginBottom: 30
  },
  inputText: {
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 0,
    padding: 10
  },
  inputTextMultiline: {
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 0,
    padding: 10,
    minHeight: 100,
    textAlignVertical: "top"
  },
  errorText: {
    fontFamily: "Roboto-Black",
    fontSize: 16,
    color: "#C51162",
    marginBottom: 10
  }
});

function mapStateToProps(state) {
  return {
    Articles: state.Articles,
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addArticle, autoSignIn, resetArticle }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPostScreen);
