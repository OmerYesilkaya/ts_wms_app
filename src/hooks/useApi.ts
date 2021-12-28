import { ApiErrorResponse, ApiOkResponse, ApiResponse } from 'apisauce';
import { useState } from 'react';

type HookResponseType = {
  data: any;
  error: boolean;
  loading: boolean;
  request: (
    ...args: any[]
  ) => Promise<ApiErrorResponse<any> | ApiOkResponse<any>>;
};

type ApiResponseType = Promise<ApiErrorResponse<any> | ApiOkResponse<any>>;

export default function useApi(
  apiFunc: (...args: any[]) => ApiResponseType
): HookResponseType {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args: any[]) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
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
