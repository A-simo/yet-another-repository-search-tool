import { SORT_OPTIONS } from '../constants';
import { Repo, SortCriteria } from '../types';
import RepoTableRow from './RepoTableRow';

interface RepoTableProps {
  repos: Repo[];
  sortOption: string;
  onSortChange: (criteria: SortCriteria) => void;
}

function RepoTable ({ repos, sortOption, onSortChange }: RepoTableProps){
    return (
      <table>
        <thead>
          <tr>
            {SORT_OPTIONS.map((option) => (
              <th
                key={option.value}
                onClick={() => onSortChange(option.value)}
                style={{ cursor: option.value !== sortOption ? 'pointer' : 'default', textDecoration: option.value === sortOption ? 'none' : 'underline' }}
              >
                {option.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {repos.map((repo, index) => (
            <RepoTableRow key={index} repo={repo} />
          ))}
        </tbody>
      </table>
    );
  }

  export default RepoTable;