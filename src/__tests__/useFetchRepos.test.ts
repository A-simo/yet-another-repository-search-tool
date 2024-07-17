import { renderHook, act } from '@testing-library/react-hooks';
import { useFetchRepos } from '../hooks/useFetchRepos';
import { Repo } from '../types';

describe('useFetchRepos', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should clear repos when query is empty', () => {
    const { result } = renderHook(() => useFetchRepos('', 'stars', 5));

    act(() => {
      result.current.clearRepos();
    });

    expect(result.current.repos).toEqual([]);
  });

  it('should sort repos by stars', async () => {
    const mockData: Repo[] = [
      { name: 'Repo 1', stars: 50, repository_url: 'https://github.com/user/repo1' },
      { name: 'Repo 2', stars: 100, repository_url: 'https://github.com/user/repo2' },
    ];
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetchRepos('query', 'stars', 5));
    await waitForNextUpdate();
    expect(result.current.repos[0].stars).toBe(100);
    expect(result.current.repos[1].stars).toBe(50);
  });

  it('should handle fetch error', async () => {
    const mockError = new Error('Failed to fetch');
    (global.fetch as jest.Mock).mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useFetchRepos('query', 'stars', 5));
    await waitForNextUpdate();
    expect(result.current.error?.message).toBe(mockError.message);
    expect(result.current.repos).toEqual([]);
  });
});
