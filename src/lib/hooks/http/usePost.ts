import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface UsePostResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  sendRequest: (body: unknown) => Promise<AxiosResponse<T>>;
}

const usePost = <T = unknown>(
  url: string,
  options?: AxiosRequestConfig
): UsePostResult<T> => {
  const baseUrl = process.env.REACT_APP_ORDER_API_HOST || "";
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async (body: unknown) => {
    let response: AxiosResponse<T>;
    try {
      setLoading(true);
      response = await axios.post(`${baseUrl}/${url}`, body, options);
      setData(response.data);
      return response;
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, sendRequest };
};

export default usePost;
