import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainContent from '../components/MainContent';

describe('MainContent', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render repo table correctly', async () => {
    const mockData = [
      { name: 'Repo 1', stars: 50, repository_url: 'https://github.com/user/repo1' },
      { name: 'Repo 2', stars: 100, repository_url: 'https://github.com/user/repo2' },
    ];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<MainContent />);
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'react' } });

    await waitFor(() => expect(screen.getByText('Repo 1')).toBeInTheDocument(), { timeout: 3000 });
    expect(screen.getByText('Repo 2')).toBeInTheDocument();
  });

  it('should clear search on Escape', async () => {
    const mockData = [
      { name: 'Repo 1', stars: 50, repository_url: 'https://github.com/user/repo1' },
      { name: 'Repo 2', stars: 100, repository_url: 'https://github.com/user/repo2' },
    ];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<MainContent />);
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(input.value).toBe('');
    await waitFor(() => expect(screen.queryByText('Repo 1')).not.toBeInTheDocument(), { timeout: 3000 });
  });
});
