import { ApiResponse } from 'apisauce';
import client from './client';

const login = (code: string, state: string): Promise<ApiResponse<any, any>> =>
  client.post('/auth/tokens', { code, state });

export default {
  login,
};
