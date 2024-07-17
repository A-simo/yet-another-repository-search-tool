import { SortCriteria } from "./types";

export const SORT_OPTIONS: { label: string; value: SortCriteria }[] = [
  { label: 'Name', value: 'name' },
  { label: 'Owner', value: 'owner' },
  { label: 'Stars', value: 'stars' },
];

export const ITEMS_PER_PAGE = 5;

export const LOADING_DATA_MESSAGE = 'Loading...';
export const LOADING_ERROR_MESSAGE = 'Something went wrong. Please try again.';

export const API_KEY = 'API_KEY';
export const BASE_URL = 'https://libraries.io/api/search';
export const REQUEST_LIMIT = 40;

  