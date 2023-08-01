import axios from "axios";
import { RAPID_API_KEY } from "@env";
import useSWR from "swr";
import { useCallback, useEffect, useState } from "react";

const baseURL = "https://jsearch.p.rapidapi.com/";

export const useGetJobs = ({ query, endpoint = "search" }) => {
  const URL = `${baseURL}${endpoint}`;
  const options = {
    method: "GET",
    url: URL,
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetcher = async () =>
    await axios.request(options).then((res) => res?.data?.data);

  const { isLoading, data, mutate, error } = useSWR(URL, () =>
    fetcher(options)
  );
  const mutateData = async () => await mutateData(fetcher());
  return { data, isLoading, error, mutateData };
};

export const useGetJobDetails = ({ query, endpoint = "job-details" }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const URL = `${baseURL}${endpoint}`;
  const options = {
    method: "GET",
    url: URL,
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response?.data?.data);
    } catch (error) {
      alert("There is an error");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    fetchData();
  }, []);
  return [data, isLoading, error];
};
