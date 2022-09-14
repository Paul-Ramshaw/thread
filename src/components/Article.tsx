import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../services/api';
import { IArticle } from '../models/article';
import Message from './Message';
import Vote from './Vote';
import { formatDate } from '../utils/format';
import Comments from './Comments';

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState<IArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(baseURL + 'articles/' + article_id)
      .then(({ data: { article } }) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <Message message="Loading..." />;
  } else if (article !== null) {
    return (
      <div className="container mx-auto lg:w-1/2">
        <div className="m-5 p-2 border-b flex">
          <Vote article={article} />
          <div>
            <div className="text-left font-light text-xs">
              Created by {article.author} on {formatDate(article.created_at)}
            </div>
            <div className="text-left font-semibold mt-2">{article.title}</div>
            <div className="text-left font-light text-sm mt-2">
              {article.body}
            </div>
            <div className="text-left font-light text-xs f mt-5 font-semibold">
              {article.topic}
            </div>
          </div>
        </div>
        <Comments article={article} />
      </div>
    );
  } else {
    return <Message message="Sorry... we can't find that one." />;
  }
};

export default Article;
