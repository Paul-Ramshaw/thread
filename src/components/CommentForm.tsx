import { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../contexts/user';
import { retryPostComment } from '../services/api';
import sortByDate from '../utils/sort';
import { IComment } from '../models/comment';

interface IProps {
  article_id: number;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

const CommentForm = ({ article_id, setComments }: IProps) => {
  const [currentComment, setCurrentComment] = useState('');
  const [postErrMsg, setPostErrMsg] = useState('');
  const user = useContext(UserContext);

  function handleSubmit(e: any) {
    e.preventDefault();

    setComments((prev) => {
      const newComments = [...prev];
      newComments.unshift({
        comment_id: Number(new Date()),
        author: user.username,
        body: currentComment,
        article_id: article_id,
        justSubmitted: true,
      });
      return newComments;
    });

    const commentToPost = {
      username: user.username,
      body: currentComment,
    };

    const url = `https://northcoders-api-news.herokuapp.com/api/articles/${article_id}/comments`;

    axios
      .post(url, commentToPost)
      .then(() => {
        axios.get(url).then(({ data: { comments } }) => {
          setComments(sortByDate(comments));
        });
      })
      .catch((error) => {
        retryPostComment(url, commentToPost, 5);
        setPostErrMsg(
          "Your comment hasn't been saved yet, but we're going to try again later."
        );
        setTimeout(() => {
          setPostErrMsg('');
        }, 20000);
      });

    setCurrentComment('');
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <textarea
          className="
          form-control
          h-500
          block
          w-full
          px-3
          py-1.5
          text-sm
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
          placeholder="What are your thoughts?"
          value={currentComment}
          onChange={(event) => setCurrentComment(event.target.value)}
        />
        <div className="text-right">
          {currentComment.trim().length > 0 ? (
            <button
              className="m-5 bg-blue-500 hover:bg-blue-700 text-sm text-white font-semibold py-1 px-2 border border-blue-700 rounded"
              type="submit"
            >
              Comment
            </button>
          ) : (
            <button
              className="m-5 bg-gray-400 text-sm text-white font-semibold py-1 px-2 border border-gray-500 rounded"
              type="submit"
              disabled
            >
              Comment
            </button>
          )}
        </div>
      </form>
      {postErrMsg ? <div>{postErrMsg}</div> : <></>}
    </div>
  );
};

export default CommentForm;
