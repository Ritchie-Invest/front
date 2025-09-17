import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Screen } from '../Type/Screen';

export const useActiveTab = () => {
  const route = useRoute();
  const [activeTab, setActiveTab] = useState<Screen>(Screen.HOME);

  useEffect(() => {
    setActiveTab(route.name as Screen);
  }, [route.name]);

  return activeTab;
};
