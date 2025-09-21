import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useLifeStore } from '../store/lifeStore';
import { lifeEventService } from '../services/lifeEventService';

export const useLifeSync = () => {
  const { refreshLifeStatus, decrementTimer, lifeStatus } = useLifeStore();

  useEffect(() => {
    refreshLifeStatus();
  }, [refreshLifeStatus]);

  useEffect(() => {
    if (lifeStatus.nextLifeIn <= 0) return;

    const interval = setInterval(() => {
      decrementTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [lifeStatus.nextLifeIn > 0, decrementTimer]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        refreshLifeStatus();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [refreshLifeStatus]);

  useEffect(() => {
    const unsubscribe = lifeEventService.subscribe(() => {
      refreshLifeStatus();
    });
    return unsubscribe;
  }, [refreshLifeStatus]);
};
