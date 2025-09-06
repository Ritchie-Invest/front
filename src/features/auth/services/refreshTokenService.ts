import axios from 'axios';
import { config } from '../../../lib/config';
import { LoginResponse } from '../models/responses';

const simpleAxios = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export async function refreshToken(): Promise<LoginResponse> {
  const res = await simpleAxios.post<LoginResponse>('/auth/refresh', {}, { withCredentials: true });
  return res.data;
}
