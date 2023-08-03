import useSWR from 'swr';
import { useCallback, useEffect, useState } from 'react';
import { get } from '../utils/axiosHelper';

export const useGetJobs = ( endpoint,query) => {
  const fetcher = async () => await get(endpoint,query)

  const {
    isLoading, data, mutate, error,
  } = useSWR(endpoint,  fetcher);
  const mutateData = async () => await mutate(fetcher());
  return {
    data, isLoading, error, mutateData,
  };
};

export const useGetJobDetails = (endpoint,query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (endpoint,query) => {
    setIsLoading(true);
    try {
      const response = await get(endpoint,query);
      setData(response);
    } catch (error) {
      alert('There is an error');
      setError(error);
    } finally {
      setIsLoading(false);
    }
  });
  useEffect(() => {
    fetchData(endpoint,query);
  }, []);

  const mutate= (endpoint,query) => {

    fetchData(endpoint,query);
  };

  return {data, isLoading, error,mutate};
};
