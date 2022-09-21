import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArticles, getTopics } from '../services/api';
import Message from './Message';
import Topics from './Topics';
import SortSelect from './SortSelect';
import ArticleCard from './ArticleCard';
import { IArticle } from '../models/article';
import { ITopic } from '../models/topic';

interface IState {
  articles: IArticle[];
  topics: ITopic[];
}

const ArticleList = () => {
  const [articles, setArticles] = useState<IState['articles']>([]);
  const [params] = useSearchParams();
  const [isLoading, setLoading] = useState(true);
  const [topics, setTopics] = useState<IState['topics']>([]);

  useEffect(() => {
    getTopics().then((data) => setTopics(data));
  }, []);

  useEffect(() => {
    getArticles(params).then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, [params]);

  if (isLoading) {
    return <Message message="Loading..." />;
  } else {
    return (
      <div>
        <div className="container mx-auto xl:w-3/5 2xl:w-1/2 min-h-screen">
          <Topics topics={topics} />
          <SortSelect />
          {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </div>
        <div></div>
      </div>
    );
  }
};

export default ArticleList;
