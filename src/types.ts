export interface Repo {
    name: string;
    repository_url: string;
    stars: number;
  }

export type SortCriteria = 'stars' | 'owner' | 'name';
