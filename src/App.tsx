import React, { useEffect, useState } from 'react';
import './i18n';
import { NativeBaseProvider } from 'native-base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppNavigator } from './navigation/AppNavigator';
import { useAuthStore } from './features/auth/store/authStore';

const queryClient = new QueryClient();

export default function App() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const [isReady, setIsReady] = useState(false);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    setIsOnboardingCompleted(!!accessToken);
    if (!accessToken) setShowLogin(false);
    setIsReady(true);
  }, [accessToken]);

  if (!isReady) return null;

  const handleOnboardingComplete = () => {
    setIsOnboardingCompleted(false);
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setIsOnboardingCompleted(true);
  };

  const handleLogout = () => {
    setIsOnboardingCompleted(false);
    setShowLogin(true);
  };

  const handleBackToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <AppNavigator
          isOnboardingCompleted={isOnboardingCompleted}
          showLogin={showLogin}
          showRegister={showRegister}
          handleLoginSuccess={handleLoginSuccess}
          handleOnboardingComplete={handleOnboardingComplete}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          handleBackToLogin={handleBackToLogin}
        />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
