import { useEffect, useState } from "react";

const useFecth = (fetchFn, initialValue) => {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const res = await fetchFn();
        setData(res);
      } catch (error) {
        setError({
          message: error.message || "Failed to fetch data.",
        });
      } finally {
        setIsFetching(false);
      }
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    error,
    data,
    setData,
    setError
  };
};

export default useFecth;
