import { useState, useEffect, useCallback } from 'react';
import { useFetchRepos } from '../hooks/useFetchRepos';
import RepoTable from '../components/RepoTable';
import Pagination from '../components/Pagination';
import InputSearch from '../components/InputSearch';
import { ITEMS_PER_PAGE, LOADING_DATA_MESSAGE, LOADING_ERROR_MESSAGE, SORT_OPTIONS } from '../constants';
import { SortCriteria } from '../types';

function MainContent() {
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortCriteria>(SORT_OPTIONS[0].value);

  const { repos, allRepos, loading, error, page, setPage, clearRepos } = useFetchRepos(query, sortOption, ITEMS_PER_PAGE);

  useEffect(() => {
    if (query === '') {
      clearRepos();
    }
  }, [query, clearRepos]);

  const handleEscape = useCallback(() => {
    setQuery('');
  }, []);

  const handleSortChange = useCallback((criteria: SortCriteria) => {
    if (criteria !== sortOption) {
      setSortOption(criteria);
      setPage(1);
    }
  }, [sortOption, setPage]);

  return (
    <div>
      <main>
        <InputSearch query={query} setQuery={setQuery} onEscape={handleEscape} />
        {loading && <p>{LOADING_DATA_MESSAGE}</p>}
        {error && <p>{LOADING_ERROR_MESSAGE}</p>}
        {repos.length ? <>
            <RepoTable repos={repos} sortOption={sortOption} onSortChange={handleSortChange} />
            <Pagination
          currentPage={page}
          totalPages={Math.ceil(allRepos.length / ITEMS_PER_PAGE)}
          onPageChange={setPage}
        />
        </>
             : null}
      </main>
    </div>
  );
}

export default MainContent;
