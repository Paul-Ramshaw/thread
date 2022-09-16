import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SortSelect = () => {
  const [selectedValue, setSelectedValue] = useState('votes');
  const [params, setParams] = useSearchParams();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    const topic = params.get('topic');

    if (topic) {
      setParams({ topic, sort_by: e.target.value });
    } else {
      setParams({ sort_by: e.target.value });
    }
  };

  return (
    <div className="text-right text-xs mr-5">
      <select
        className="border py-1 px-2 "
        name="sort"
        id="sort"
        value={selectedValue}
        onChange={(e) => handleSelect(e)}
      >
        <option value="votes">Most Votes</option>
        <option value="created_at">Most Recent</option>
      </select>
    </div>
  );
};

export default SortSelect;
