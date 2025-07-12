import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '../models/user';

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;
  login: (accessToken: string, user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setAccessToken: (accessToken: string) => void;
}

const zustandStorage = createJSONStorage<AuthState>(() => AsyncStorage);

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isLoading: false,
      login: (accessToken, user) => set({ accessToken, user }),
      logout: () => set({ accessToken: null, user: null }),
      setLoading: (isLoading) => set({ isLoading }),
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: 'auth-storage',
      storage: zustandStorage,
    },
  ),
);
