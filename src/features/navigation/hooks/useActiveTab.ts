import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Tab, TabNameType } from '../Type/TabNames';

export const useActiveTab = () => {
  const route = useRoute();
  const [activeTab, setActiveTab] = useState<TabNameType>('Landing');

  useEffect(() => {
    setActiveTab(route.name as TabNameType);
  }, [route.name]);

  return activeTab;
};
