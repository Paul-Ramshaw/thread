import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IArticle as Props } from '../models/article';

interface IProps {
  article: Props;
}

const Vote: React.FC<IProps> = ({ article }) => {
  return (
    <div className="flex flex-col mr-4 mt-1 font-light text-xs">
      <FontAwesomeIcon icon={faArrowUp} />
      {article.votes}
      <FontAwesomeIcon icon={faArrowDown} />
    </div>
  );
};

export default Vote;
