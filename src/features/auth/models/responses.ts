import { User } from '../models/user';

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface SSOUrlResponse {
  url: string;
}
