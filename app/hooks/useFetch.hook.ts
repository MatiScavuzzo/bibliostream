import { loadAbort } from '@utilities';
import { useEffect, useState } from 'react';

type Data<T> = T | null;
type TypeError = Error | null;

interface Props<T> {
  data: Data<T>;
  isLoading: boolean;
  error: TypeError;
}

export const useFetch = <T>(
  url: string | null,
  options: RequestInit = { method: 'GET' }
): Props<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<TypeError>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const controller = loadAbort();
      try {
        if (url !== null) {
          const response = await fetch(url, {
            ...options,
            signal: controller.signal,
          });
          if (!response.ok) {
            throw new Error(`Something went wrong! Code: ${response.status}`);
          }
          const data = await response.json();
          setData(data);
          setError(null);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      loadAbort().abort();
    };
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
};
