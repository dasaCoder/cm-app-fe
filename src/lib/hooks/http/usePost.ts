import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface UsePostResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  sendRequest: (body: unknown) => Promise<void>;
}

const usePost = <T = unknown>(
  url: string,
  options?: AxiosRequestConfig
): UsePostResult<T> => {
  const baseUrl = process.env.REACT_APP_BACKEND_HOST || "";
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async (body: unknown) => {
    try {
      setLoading(true);
      const response: AxiosResponse<T> = await axios.post(`${baseUrl}/${url}`, body, options);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, sendRequest };
};

export default usePost;
