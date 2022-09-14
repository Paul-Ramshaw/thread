import axios from 'axios';

export const baseURL = 'https://northcoders-api-news.herokuapp.com/api/';

export const retryPostComment = (
  url: string,
  commentToPost: { username: string; body: string },
  retries: number
) => {
  if (!retries) {
    return;
  }

  axios.post(url, commentToPost).catch((error) => {
    setTimeout(() => {
      retryPostComment(url, commentToPost, retries - 1);
    }, 5000);
  });
};
