import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { UserInfos } from '~/features/user/models/userInfos';

interface UserInfosStoreState {
  currentUserInfos: UserInfos | null;
  setCurrentUserInfos: (userInfos: UserInfos) => void;
  clearCurrentUserInfos: () => void;
}

export const useUserInfosStore = create<UserInfosStoreState>()(
  // @ts-ignore
  subscribeWithSelector((set, get) => ({
    currentUserInfos: null,

    setCurrentUserInfos: (userInfos: UserInfos) => {
      set({ currentUserInfos: userInfos });
    },

    clearCurrentUserInfos: () => {
      set({ currentUserInfos: null });
    },
  })),
);

export const useCurrentUserInfos = () => useUserInfosStore((state) => state.currentUserInfos);
export const useSetCurrentUserInfos = () => useUserInfosStore((state) => state.setCurrentUserInfos);
export const useClearCurrentUserInfos = () =>
  useUserInfosStore((state) => state.clearCurrentUserInfos);
