import { IArticle as Props } from '../models/article';
import { snippet, formatDate } from '../utils/format';
import Vote from './Vote';
import { Link } from 'react-router-dom';

interface IProps {
  article: Props;
}

const ArticleCard: React.FC<IProps> = ({ article }) => {
  return (
    <div className="m-5 p-2 border-b flex">
      <Vote article={article} />
      <div className="flex-grow">
        <div className="text-left font-light text-xs text-slate-600">
          Created by {article.author} on {formatDate(article.created_at)}
        </div>
        <Link to={`/articles/${article.article_id}`}>
          <div className="text-left font-semibold mt-2">{article.title}</div>
          <div className="text-left font-light text-sm mt-2 text-slate-600">
            {snippet(article.body)}
          </div>
        </Link>
        <div className="text-left font-light text-xs f mt-5 font-semibold">
          {article.topic}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
