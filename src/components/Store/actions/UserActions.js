import {
  REGISTER_USER,
  SIGN_USER,
  AUTO_SIGN_IN,
  GET_USER_POSTS,
  DELETE_USER_POST
} from "../types";
import { FIREBASE_URL } from "../../../config/api";
import axios from "axios";

import { SIGN_UP, SIGN_IN, REFRESH } from "../../../config/api";
import { setTokens } from "../../utils/Misc";

export function signUp(data) {
  const request = axios({
    method: "POST",
    url: SIGN_UP,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return false;
    });

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function signIn(data) {
  const request = axios({
    method: "POST",
    url: SIGN_IN,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    },
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return false;
    });

  return {
    type: SIGN_USER,
    payload: request
  };
}

export const autoSignIn = refToken => {
  const request = axios({
    method: "POST",
    url: REFRESH,
    data: "grant_type=refresh_token&refresh_token=" + refToken,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return false;
    });

  return {
    type: AUTO_SIGN_IN,
    payload: request
  };
};

export function getUserPosts(userId) {
  let url = FIREBASE_URL + "/articles.json";
  url = `${url}?orderBy=\"uid\"&equalTo=\"${userId}\"`;

  const request = axios(url)
    .then(response => {
      const articles = [];
      for (let key in response.data) {
        articles.push({
          ...response.data[key],
          id: key
        });
      }
      return articles;
    })
    .catch(err => {
      return false;
    });

  return {
    type: GET_USER_POSTS,
    payload: request
  };
}

export const deleteUserPost = (postId, userData) => {
  const promise = new Promise((resolve, reject) => {
    const url = `${FIREBASE_URL}/articles/${postId}.json`;

    const request = axios({
      method: "DELETE",
      url: `${url}?auth=${userData.token}`
    })
      .then(response => {
        resolve({
          deletePost: true
        });
      })
      .catch(error => {
        const signIn = autoSignIn(userData.refToken);
        signIn.payload.then(response => {
          let newTokens = {
            token: response.id_token,
            refToken: response.refresh_token,
            uid: response.user_id
          };
          setTokens(newTokens, () => {
            axios({
              method: "DELETE",
              url: `${url}?auth=${userData.token}`
            })
              .then(() => {
                resolve({
                  userData: newTokens,
                  deletePost: true
                });
              })
              .catch(error => {
                alert("Could not delete post");
              });
          });
        });
      });
  });

  return {
    type: DELETE_USER_POST,
    payload: promise
  };
};
