import { axiosInstance } from '../../../lib/api/axios';
import { SSOProvider } from '../models/sso';
import {
  LoginResponse,
  RegisterResponse,
  ForgotPasswordResponse,
  SSOUrlResponse,
} from '../models/responses';

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await axiosInstance.post<LoginResponse>('/auth/login', { email, password });
  return res.data;
}
export async function getSSOUrl(provider: SSOProvider): Promise<SSOUrlResponse> {
  const res = await axiosInstance.get<SSOUrlResponse>(`/auth/sso/url?provider=${provider}`);
  return res.data;
}

export async function register(email: string, password: string): Promise<RegisterResponse> {
  const res = await axiosInstance.post<RegisterResponse>('/auth/register', { email, password });
  return res.data;
}

export async function forgotPassword(email: string): Promise<ForgotPasswordResponse> {
  const res = await axiosInstance.post<ForgotPasswordResponse>('/auth/forgot-password', { email });
  return res.data;
}
