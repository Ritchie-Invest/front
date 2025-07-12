import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../features/landing/screens/home';
import { OnboardingFlow } from '../features/onboarding/screens/OnboardingFlow';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../features/auth/screens/RegisterScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator();

export const AppNavigator = ({
  isOnboardingCompleted,
  showLogin,
  showRegister,
  handleLoginSuccess,
  handleOnboardingComplete,
  handleLogin,
  handleLogout,
  handleBackToLogin,
}: {
  isOnboardingCompleted: boolean;
  showLogin: boolean;
  showRegister: boolean;
  handleLoginSuccess: () => void;
  handleOnboardingComplete: () => void;
  handleLogin: () => void;
  handleLogout: () => void;
  handleBackToLogin: () => void;
}) => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isOnboardingCompleted ? (
        showRegister ? (
          <Stack.Screen name="Register">
            {() => (
              <RegisterScreen onBackToLogin={handleBackToLogin} onSuccess={handleLoginSuccess} />
            )}
          </Stack.Screen>
        ) : showLogin ? (
          <Stack.Screen name="Login">
            {() => <LoginScreen onLoginSuccess={handleLoginSuccess} signupEnabled={false} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Onboarding">
            {() => <OnboardingFlow onComplete={handleOnboardingComplete} onLogin={handleLogin} />}
          </Stack.Screen>
        )
      ) : (
        <Stack.Screen name="Home" options={{ headerShown: true, title: '' }}>
          {() => <HomeScreen onLogout={handleLogout} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  </NavigationContainer>
);
