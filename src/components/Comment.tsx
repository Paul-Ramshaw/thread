import { useEffect, useState, useContext } from 'react';
import { formatDate } from '../utils/format';
import UserContext from '../contexts/user';
import { deleteComment } from '../services/api';
import { IComment } from '../models/comment';

interface IProps {
  comment: IComment;
  author: string;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

const Comment: React.FC<IProps> = ({ comment, author, setComments }) => {
  const [commentDate, setCommentDate] = useState('');
  const user = useContext(UserContext);

  useEffect(() => {
    if (comment.created_at) {
      const createdAt = formatDate(comment.created_at);
      setCommentDate(createdAt);
    }
  }, [comment]);

  function handleDeleteClick() {
    setComments((prev: any) => {
      let newComments = [...prev];
      return (newComments = newComments.filter((newComment) => {
        return newComment.comment_id !== comment.comment_id;
      }));
    });

    deleteComment(comment.comment_id);
  }

  let commentDetails = `${author} commented on ${commentDate}`;

  if (comment.author === user.username) {
    commentDetails = `You commented on ${commentDate}`;
  }

  if (!comment.created_at) {
    commentDetails = 'You just commented on this post';
  }

  return (
    <div className="mb-4 border-b">
      <div className="text-xs mb-1 text-left font-light">{commentDetails}</div>
      <div className="mb-5">
        <p className="text-sm text-left ">{comment.body}</p>
        <div className="text-right">
          {!comment.justSubmitted && user.username === comment.author ? (
            <button
              className="m-5 bg-red-500 hover:bg-red-600 text-sm text-white font-semibold py-1 px-2 border border-red-600 rounded"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
