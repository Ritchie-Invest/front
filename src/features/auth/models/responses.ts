import { User } from '../models/user';

export interface LoginResponse {
  accessToken: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  type: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface SSOUrlResponse {
  url: string;
}
