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

const retryVote = (url: string, vote: number, retries: number) => {
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

export const voteOnArticle = (url: string, vote: number) => {
  axios
    .patch(url, {
      inc_votes: vote,
    })
    .catch(() => {
      retryVote(url, vote, 5);
    });
};
