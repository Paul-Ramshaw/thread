import { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import sortByDate from '../utils/sort';
import CommentForm from './CommentForm';
import { IArticle as Props } from '../models/article';
import { IComment } from '../models/comment';

interface IProps {
  article: Props;
}

const Comments: React.FC<IProps> = ({ article }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://northcoders-api-news.herokuapp.com/api/articles/${article.article_id}/comments`
      )
      .then(({ data: { comments } }) => {
        setComments(sortByDate(comments));
        setIsLoading(false);
      })
      .catch((err) => {
        setCommentsError(true);
        setIsLoading(false);
      });
  }, [article]);

  if (isLoading) {
    return <></>;
  }

  if (commentsError) {
    return <p>Can't get comments right now</p>;
  }

  return (
    <div className="mx-auto w-5/6">
      <CommentForm article_id={article.article_id} setComments={setComments} />
      <div>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.comment_id}
              comment={comment}
              author={comment.author}
              setComments={setComments}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
