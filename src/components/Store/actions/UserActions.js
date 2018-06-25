import { REGISTER_USER, SIGN_USER, AUTO_SIGN_IN } from "../types";
import axios from "axios";

import { SIGN_UP, SIGN_IN, REFRESH } from "../../../config/api";

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

export function autoSignIn(refToken) {
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
}
