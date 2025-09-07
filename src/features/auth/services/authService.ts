import { axiosInstance } from '../../../lib/api/axios';
import { LoginResponse, RegisterResponse, ForgotPasswordResponse } from '../models/responses';

function decodeJwtPayload(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await axiosInstance.post<LoginResponse>(
    '/auth/login',
    { email, password },
    { withCredentials: true },
  );
  return res.data;
}

export async function register(email: string, password: string): Promise<RegisterResponse> {
  const res = await axiosInstance.post<RegisterResponse>(
    '/auth/register',
    { email, password },
    { withCredentials: true },
  );
  return res.data;
}

export async function refreshToken(): Promise<LoginResponse> {
  const res = await axiosInstance.post<LoginResponse>(
    '/auth/refresh',
    {},
    { withCredentials: true },
  );
  return res.data;
}

export async function logout(): Promise<void> {
  await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
}

export async function forgotPassword(email: string): Promise<ForgotPasswordResponse> {
  const res = await axiosInstance.post<ForgotPasswordResponse>('/auth/forgot-password', { email });
  return res.data;
}

export function getUserFromToken(accessToken: string) {
  const payload = decodeJwtPayload(accessToken);
  if (!payload) return null;

  return {
    id: payload.id,
    email: payload.email,
    type: payload.type,
    portfolioId: payload.portfolioId,
  };
}
