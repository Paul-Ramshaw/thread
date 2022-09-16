import Comment from './Comment';
import CommentForm from './CommentForm';
import { IArticle } from '../models/article';
import { IComment } from '../models/comment';

interface IProps {
  article: IArticle;
  comments: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

const Comments: React.FC<IProps> = ({ article, comments, setComments }) => {
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
