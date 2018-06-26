import axios from "axios";
import { GET_ARTICLES } from "../types";
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
