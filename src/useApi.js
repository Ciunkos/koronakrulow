import { serialize } from "@sandstreamdev/std/query";
import { useCallback, useEffect, useState } from "react";

const randomSeed = () => Math.random();

const useApi = (endpoint, query, options) => {
  const [busy, setBusy] = useState(true);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [seed, setSeed] = useState(randomSeed);

  useEffect(() => {
    let canceled = false;

    const task = async () => {
      setBusy(true);
      setError(undefined);

      const url = [endpoint, serialize(query)].filter(Boolean).join("?");

      try {
        const response = await fetch(url, options);

        const data = await response.json();

        if (!canceled) {
          setData(data);
        }
      } catch (error) {
        if (!canceled) {
          setError(error);
        }
      } finally {
        if (!canceled) {
          setBusy(false);
        }
      }
    };

    task();

    return () => {
      canceled = true;
    };
  }, [endpoint, query, seed, options]);

  const refetch = useCallback(() => {
    setSeed(randomSeed());
  });

  return [data, { busy, error, refetch }];
};

export default useApi;
