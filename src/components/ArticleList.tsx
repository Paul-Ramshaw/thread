import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import { IArticle } from '../models/article';
import { baseURL } from '../services/api';

interface IState {
  articles: IArticle[];
}

const ArticleList = () => {
  const [articles, setArticles] = useState<IState['articles']>([]);

  useEffect(() => {
    axios
      .get(baseURL + 'articles')
      .then(({ data: { articles } }) => {
        setArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto lg:w-1/2">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </div>
  );
};

export default ArticleList;
