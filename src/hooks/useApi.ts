import { useState } from 'react';

type AsyncFuncReturnType = Promise<{
  ok: boolean;
  data: any;
}>;

export default function useApi(
  apiFunc: (...params: any) => AsyncFuncReturnType
) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args: any) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      console.log('ERROR', response);
      return setError(true);
    }
    setError(false);
    setData(response.data);
    return response;
  };

  return {
    data,
    error,
    loading,
    request,
  };
}
