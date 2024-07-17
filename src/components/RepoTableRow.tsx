import { Repo } from '../types';
import { extractOwnerFromUrl } from '../utils';

interface RepoTableRowProps {
  repo: Repo;
}

function RepoTableRow ({ repo }: RepoTableRowProps){
    return (
      <tr>
        <td>{repo.name}</td>
        <td>{extractOwnerFromUrl(repo.repository_url)}</td>
        <td>{repo.stars}</td>
      </tr>
    );
}

export default RepoTableRow;