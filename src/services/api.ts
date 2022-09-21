import axios from 'axios';
import sortByDate from '../utils/sort';
import { IPostComment } from '../models/comment';

export const baseURL = 'https://northcoders-api-news.herokuapp.com/api';

export const retryPostComment = (
  url: string,
  commentToPost: IPostComment,
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

export const retryVote = (url: string, vote: number, retries: number) => {
  if (!retries) {
    return;
  }

  axios
    .patch(url, {
      inc_votes: vote,
    })
    .catch(() => {
      setTimeout(() => {
        retryVote(url, vote, retries - 1);
      }, 5000);
    });
};

export const retryDeleteComment = (url: string, retries: number) => {
  if (!retries) {
    return;
  }

  axios.delete(url).catch(() => {
    setTimeout(() => {
      retryDeleteComment(url, retries - 1);
    }, 5000);
  });
};

export const voteOnArticle = (article_id: number, vote: number) => {
  const url = `${baseURL}/articles/${article_id}/${article_id}`;
  axios
    .patch(url, {
      inc_votes: vote,
    })
    .catch(() => {
      retryVote(url, vote, 5);
    });
};

export const getTopics = () => {
  return axios
    .get(`${baseURL}/topics`)
    .then(({ data: { topics } }) => {
      return topics;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getArticles = (params: URLSearchParams) => {
  return axios
    .get(baseURL + '/articles', { params })
    .then(({ data: { articles } }) => {
      return articles;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getArticle = (article_id: number) => {
  return axios
    .get(`${baseURL}/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const getComments = (article_id: number) => {
  return axios
    .get(`${baseURL}/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return sortByDate(comments);
    });
};

export const postComment = (article_id: number, comment: IPostComment) => {
  const url = `${baseURL}/articles/${article_id}/comments`;
  return axios.post(url, comment).then(() => {
    axios
      .get(url)
      .then(({ data: { comments } }) => {
        return comments;
      })
      .catch(() => {
        retryPostComment(url, comment, 5);
      });
  });
};

export const deleteComment = (comment_id: number) => {
  const url = `${baseURL}/comments/${comment_id}`;
  axios.delete(url).catch((error) => {
    retryDeleteComment(url, 5);
  });
};
