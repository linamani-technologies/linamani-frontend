import { useState } from "react";
import axios from "axios";

type FetchOptions = {
  method?: "POST" | "GET";
  body?: any;
};

export function useFetch<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetcher(url: string, options: FetchOptions = {}) {
    setLoading(true);
    setError(null);
    try {
      const res = await axios({
        url,
        method: options.method || "POST",
        data: options.body || {},
      });
      setData(res.data);
    } catch (err) {
      const axiosError = err as any;
      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, fetcher };
}
