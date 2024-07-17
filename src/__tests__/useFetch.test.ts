import { renderHook } from '@testing-library/react-hooks';
import { useFetch } from '../hooks/useFetch';
import { BASE_URL } from '../constants';

describe('useFetch', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should set loading to true initially', () => {
    (global.fetch as jest.Mock).mockImplementation(() => 
      new Promise(() => {}));
    const { result } = renderHook(() => useFetch(BASE_URL));
    expect(result.current.loading).toBe(true);
  });

  it('should set data when fetch is successful', async () => {
    const mockData = { name: 'Some project' };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetch(BASE_URL));
    await waitForNextUpdate();
    expect(result.current.data).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should set error when fetch fails', async () => {
    const mockError = new Error('Failed to fetch');
    (global.fetch as jest.Mock).mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useFetch(BASE_URL));
    await waitForNextUpdate();
    expect(result.current.error?.message).toBe(mockError.message);
    expect(result.current.loading).toBe(false);
  });
});
