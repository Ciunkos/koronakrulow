import { serialize } from "@sandstreamdev/std/query/index.js";
import { useCallback, useEffect, useState } from "react";
import type { z } from "zod/mini";

const randomSeed = () => Math.random();

type Query = Parameters<typeof serialize>[0];

// Fetches JSON and validates it with the schema; a response that does not
// match becomes an error instead of data.
interface ApiState {
  busy: boolean;
  error: unknown;
  refetch: () => void;
}

const useApi = <T>(
  endpoint: string,
  schema: z.ZodMiniType<T>,
  query?: Query,
  options?: RequestInit
): [T | undefined, ApiState] => {
  const [busy, setBusy] = useState(true);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<unknown>(undefined);
  const [seed, setSeed] = useState(randomSeed);

  useEffect(() => {
    let canceled = false;

    const task = async () => {
      setBusy(true);
      setError(undefined);

      const url = [endpoint, serialize(query)].filter(Boolean).join("?");

      try {
        const response = await fetch(url, options);

        const data = schema.parse(await response.json());

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
  }, [endpoint, schema, query, seed, options]);

  const refetch = useCallback(() => {
    setSeed(randomSeed());
  }, []);

  return [data, { busy, error, refetch }];
};

export default useApi;
