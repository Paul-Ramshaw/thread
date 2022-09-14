import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IArticle as Props } from '../models/article';
import { useState, useEffect } from 'react';
import { voteOnArticle } from '../services/api';

interface IProps {
  article: Props;
}

const Vote: React.FC<IProps> = ({ article }) => {
  const [articleVotes, setArticleVotes] = useState(0);

  useEffect(() => {
    setArticleVotes(article.votes);
  }, [article]);

  const handleVote = (vote: number) => {
    setArticleVotes((currVote) => {
      return currVote + vote;
    });

    const url = `https://northcoders-api-news.herokuapp.com/api/articles/${article.article_id}`;
    voteOnArticle(url, vote);
  };

  return (
    <div className="flex flex-col mr-1 mt-1 font-light text-xs">
      <FontAwesomeIcon
        className="hover:cursor-pointer"
        icon={faArrowUp}
        onClick={() => handleVote(1)}
      />
      {articleVotes ? <div className="w-7">{articleVotes}</div> : <></>}
      <FontAwesomeIcon
        className="hover:cursor-pointer"
        icon={faArrowDown}
        onClick={() => handleVote(-1)}
      />
    </div>
  );
};

export default Vote;
