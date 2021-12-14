import { ApiResponse } from 'apisauce';
import { useState } from 'react';

export default function useApi(
  apiFunc: (...params: any) => Promise<ApiResponse<any>>
) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args: any): Promise<ApiResponse<any>> => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      console.log('ERROR', response);
      setError(true);
      return response;
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
