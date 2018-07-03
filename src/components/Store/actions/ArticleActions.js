import axios from "axios";
import { GET_ARTICLES, ADD_ARTICLE, RESET_ARTICLE } from "../types";
import { FIREBASE_URL } from "../../../config/api";

export function getArticles(category) {
  let url = FIREBASE_URL + "/articles.json";

  if (category !== "All") {
    url = `${url}/?orderBy=\"category\"&equalTo=\"${category}\"`;
  }

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
    type: GET_ARTICLES,
    payload: request
  };
}

export function addArticle(article, token) {
  const request = axios({
    method: "POST",
    url: `${FIREBASE_URL}/articles.json?auth=${token}`,
    data: article
  })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return false;
    });

  return {
    type: ADD_ARTICLE,
    payload: request
  };
}

export function resetArticle() {
  return {
    type: RESET_ARTICLE,
    payload: ""
  };
}
