import { ICharacterFilter } from 'src/store/api/types';

const FILTER_KEY = 'filter_user';

export function setFilters(filters: ICharacterFilter) {
  localStorage.setItem(FILTER_KEY, JSON.stringify(filters));
}

export function getFilters() {
  const filters = localStorage.getItem(FILTER_KEY);
  if (filters) {
    return JSON.parse(filters);
  }
  return null;
}
