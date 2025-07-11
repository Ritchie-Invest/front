import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Platform } from 'react-native';
import { User } from '../models/user';

export interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

const zustandStorage = createJSONStorage<AuthState>(() => {
  if (Platform.OS === 'web') {
    return {
      getItem: (name: string) => Promise.resolve(localStorage.getItem(name)),
      setItem: (name: string, value: string) => Promise.resolve(localStorage.setItem(name, value)),
      removeItem: (name: string) => Promise.resolve(localStorage.removeItem(name)),
    };
  }

  return AsyncStorage;
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLoading: false,
      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      storage: zustandStorage,
    },
  ),
);
