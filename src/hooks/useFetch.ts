import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

const useFetch = <T,>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, error, loading };
};

export default useFetch;