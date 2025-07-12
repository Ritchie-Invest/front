import { User } from '../models/user';

export interface LoginResponse {
  accessToken: string;
}

export interface RegisterResponse {
  accessToken: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface SSOUrlResponse {
  url: string;
}
