import { useState, useEffect, useCallback } from 'react';
import { Repo, SortCriteria } from '../types';
import { useFetch } from './useFetch';
import { useDebounce } from './useDebounce';
import { extractOwnerFromUrl } from '../utils';
import { API_KEY, BASE_URL, REQUEST_LIMIT } from '../constants';

export const useFetchRepos = (query: string, sortOption: SortCriteria, ITEMS_PER_PAGE: number) => {
  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 1000);
  const url = debouncedQuery ? `${BASE_URL}?q=${debouncedQuery}&per_page=${REQUEST_LIMIT}&api_key=${API_KEY}` : '';
  const { data, loading, error } = useFetch<Repo[]>(url);

  useEffect(() => {
    if (debouncedQuery && data) {
      setAllRepos(data);
    } else {
      setAllRepos([]);
    }
  }, [data, debouncedQuery]);

  const clearRepos = useCallback(() => {
    setAllRepos([]);
    setPage(1);
  }, []);

  const sortedRepos = useSortRepos(allRepos, sortOption, ITEMS_PER_PAGE, page);

  return { repos: sortedRepos, allRepos, loading, error, page, setPage, clearRepos };
};

const sortRepos = (repos: Repo[], criteria: SortCriteria): Repo[] => {
  return [...repos].sort((a, b) => {
    if (criteria === 'stars') {
      return b.stars - a.stars;
    } else if (criteria === 'owner') {
      return extractOwnerFromUrl(a.repository_url).localeCompare(extractOwnerFromUrl(b.repository_url));
    } else {
      return a[criteria].localeCompare(b[criteria]);
    }
  });
};

export const useSortRepos = (allRepos: Repo[], sortOption: SortCriteria, ITEMS_PER_PAGE: number, page: number) => {
  const [sortedRepos, setSortedRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const sortedData = sortRepos(allRepos, sortOption);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setSortedRepos(sortedData.slice(startIndex, endIndex));
  }, [allRepos, sortOption, ITEMS_PER_PAGE, page]);

  return sortedRepos;
};
