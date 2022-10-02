import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface IRequestHookConfig {
  // request params
  params?: any;
  // guards are like middlewares that run when a response is returned, before the state changes
  // multiple guards can be added for different kind of checks
  guards?: Array<(response: any, err: AxiosError | null) => Promise<void>>;
}

export const useGetHook = <T extends unknown = any>(
  instance: AxiosInstance,
  url: string,
  config?: IRequestHookConfig
) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const response = await instance.get<T>(url, { params: config?.params });
      if (config?.guards && config.guards.length !== 0) {
        await Promise.all(
          config.guards.map(async (eachGuard) => eachGuard(response, null))
        );
      }
      setData(response.data);
      setResponse(response);
    } catch (err: any) {
      if (config?.guards && config.guards.length !== 0) {
        await Promise.all(
          config.guards.map(async (eachGuard) => eachGuard(null, err))
        );
      }
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
    return () => {
      setError(null);
      setData(null);
    };
  }, [config?.params]);

  return { loading, response, data, error, refetch: fetch };
};
