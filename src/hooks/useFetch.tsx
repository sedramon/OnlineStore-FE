import { useState, useEffect } from "react";

const useFetch = (url: string, method: string) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(url, { method: method })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [url, shouldFetch]);

  const refetch = () => {
    setShouldFetch((prevValue) => !prevValue);
  }

  return { data, isLoading, error, refetch };
};

export default useFetch;
