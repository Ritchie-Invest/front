import {
  login,
  register,
  refreshToken,
  logout,
  forgotPassword,
  getUserFromToken,
} from '../services/authService';
import { axiosInstance } from '../../../lib/api/axios';
import { LoginResponse, RegisterResponse, ForgotPasswordResponse } from '../models/responses';

// Mock axios instance
jest.mock('../../../lib/api/axios', () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}));

const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const mockResponse: LoginResponse = {
        accessToken: 'mock-access-token',
      };

      mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

      const result = await login('test@example.com', 'password123');

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/login',
        { email: 'test@example.com', password: 'password123' },
        { withCredentials: true },
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when login fails', async () => {
      const mockError = new Error('Invalid credentials');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(login('test@example.com', 'wrongpassword')).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const mockResponse: RegisterResponse = {
        accessToken: 'mock-access-token',
      };

      mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

      const result = await register('newuser@example.com', 'password123');

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/register',
        { email: 'newuser@example.com', password: 'password123' },
        { withCredentials: true },
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when registration fails', async () => {
      const mockError = new Error('Email already exists');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(register('existing@example.com', 'password123')).rejects.toThrow(
        'Email already exists',
      );
    });
  });

  describe('refreshToken', () => {
    it('should successfully refresh access token', async () => {
      const mockResponse: LoginResponse = {
        accessToken: 'new-access-token',
      };

      mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

      const result = await refreshToken();

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/refresh',
        {},
        { withCredentials: true },
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when refresh fails', async () => {
      const mockError = new Error('Invalid refresh token');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(refreshToken()).rejects.toThrow('Invalid refresh token');
    });
  });

  describe('logout', () => {
    it('should successfully logout', async () => {
      mockAxiosInstance.post.mockResolvedValue({});

      await logout();

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/logout',
        {},
        { withCredentials: true },
      );
    });

    it('should handle logout errors gracefully', async () => {
      const mockError = new Error('Logout failed');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(logout()).rejects.toThrow('Logout failed');
    });
  });

  describe('forgotPassword', () => {
    it('should successfully send forgot password request', async () => {
      const mockResponse: ForgotPasswordResponse = {
        message: 'Password reset email sent',
      };

      mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

      const result = await forgotPassword('test@example.com');

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/forgot-password', {
        email: 'test@example.com',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when forgot password fails', async () => {
      const mockError = new Error('Email not found');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(forgotPassword('notfound@example.com')).rejects.toThrow('Email not found');
    });
  });

  describe('getUserFromToken', () => {
    it('should successfully decode user from valid JWT token', () => {
      // Mock JWT token with base64 encoded payload: {"id":1,"email":"test@example.com","type":"student"}
      const mockToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwidHlwZSI6InN0dWRlbnQifQ.signature';

      const result = getUserFromToken(mockToken);

      expect(result).toEqual({
        id: 1,
        email: 'test@example.com',
        type: 'student',
      });
    });

    it('should return null for invalid JWT token', () => {
      const result = getUserFromToken('invalid-token');
      expect(result).toBeNull();
    });

    it('should return null for empty token', () => {
      const result = getUserFromToken('');
      expect(result).toBeNull();
    });

    it('should return null for malformed JWT token', () => {
      const result = getUserFromToken('header.invalid-payload.signature');
      expect(result).toBeNull();
    });
  });
});
