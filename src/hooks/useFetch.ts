import { useState, useEffect, useRef } from 'react';

type FetchError = {
  message: string;
  name: string;
};

export const useFetch = <T,>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FetchError | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        if (!response.ok) {
          throw new Error('Error while request execution');
        }
        const result = await response.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError({ message: err.message, name: err.name });
        }
      } finally {
        // Ensure loading is only set to false if the current request is the same as the one being aborted
        if (abortControllerRef.current === controller) {
          setLoading(false);
        }
      }
    };

    if (url) {
      fetchData();
    } else {
      // Handle case when the URL is empty
      setLoading(false);
      setData(null);
      setError(null);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, options]);

  return { data, loading, error };
};
