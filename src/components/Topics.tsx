import { ITopic } from '../models/topic';
import { useSearchParams } from 'react-router-dom';

interface IState {
  topics: ITopic[];
}

const Topics = ({ topics }: IState) => {
  const [params, setParams] = useSearchParams();

  const handleClick = (topic: string) => {
    const sort_by = params.get('sort_by');

    if (sort_by) {
      setParams({ topic, sort_by });
    } else {
      setParams({ topic });
    }
  };

  return (
    <div className="flex flex-wrap ml-5 mt-2">
      {topics.map((topic: ITopic, i: number) => (
        <div
          key={i}
          className="m-1 bg-gray-100 hover:bg-gray-200 cursor-pointer text-xs text-slate-600 font-semibold py-1 px-2 rounded-xl"
          onClick={() => handleClick(topic.slug)}
        >
          {topic.slug}
        </div>
      ))}
    </div>
  );
};

export default Topics;
