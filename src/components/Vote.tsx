import { useState, useEffect } from 'react';
import { voteOnArticle } from '../services/api';
import { IArticle as Props } from '../models/article';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  article: Props;
}

const Vote: React.FC<IProps> = ({ article }) => {
  const [articleVotes, setArticleVotes] = useState(0);
  const [votesLoading, setVotesLoading] = useState(true);

  useEffect(() => {
    setArticleVotes(article.votes);
    setVotesLoading(false);
  }, [article]);

  const handleVote = (vote: number) => {
    setArticleVotes((currVote) => {
      return currVote + vote;
    });

    voteOnArticle(article.article_id, vote);
  };

  return (
    <div className="flex flex-col mr-1 mt-1 font-light text-xs w-10">
      <FontAwesomeIcon
        className="hover:cursor-pointer"
        icon={faArrowUp}
        onClick={() => handleVote(1)}
      />
      {!votesLoading ? <div className="w-7">{articleVotes}</div> : <></>}
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faArrowDown}
        onClick={() => handleVote(-1)}
      />
    </div>
  );
};

export default Vote;
