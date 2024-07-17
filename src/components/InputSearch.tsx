import React from 'react';

interface InputSearchProps {
  query: string;
  setQuery: (query: string) => void;
  onEscape: () => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ query, setQuery, onEscape }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onEscape();
    }
  };

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder='Search...'
    />
  );
};

export default InputSearch;
