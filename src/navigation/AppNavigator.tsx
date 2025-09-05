import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box } from 'native-base';
import { OnboardingLayout } from '../features/onboarding/screens/OnboardingLayout';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../features/auth/screens/RegisterScreen';
import HomeScreen from '../features/landing/screens/home';
import { InvestmentDashboardScreen } from '../features/investment-dashboard/screens/InvestmentDashboardScreen';
import { ETFDetailScreen } from '../features/etf-detail/screens/ETFDetailScreen';
import Navbar from '../features/navigation/components/organisms/navbar';
import ModuleScreen from '../features/games/screens/ModuleScreen';
import CompleteScreen from '../features/games/screens/CompleteScreen';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
  ModuleScreen: { lessonId: string; moduleId: string };
  CompleteScreen: { lessonId: string };
};

export type MainStackParamList = {
  Landing: undefined;
  InvestmentDashboard: undefined;
  ETFDetails: { etfID: number };
  Progress: undefined;
  Profile: undefined;
  Register: undefined;
  Onboarding: undefined;
  ModuleScreen: {
    lessonId: string;
    moduleId: string;
    currentGameModuleIndex?: number;
    totalGameModules?: number;
    reviewMode?: boolean;
  };
  CompleteScreen: { lessonId: string };
};

const Stack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator<MainStackParamList>();

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
            {() => <OnboardingLayout onComplete={handleOnboardingComplete} onLogin={handleLogin} />}
          </Stack.Screen>
        )
      ) : (
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => (
            <MainStack.Navigator
              screenOptions={{
                headerShown: true,
                headerTitle: '',
              }}
            >
              <MainStack.Screen name="Landing">
                {() => (
                  <Box flex={1}>
                    <HomeScreen onLogout={handleLogout} />
                    <Navbar />
                  </Box>
                )}
              </MainStack.Screen>
              <MainStack.Screen name="InvestmentDashboard" options={{ headerTitle: 'Portfolio' }}>
                {() => (
                  <Box flex={1}>
                    <InvestmentDashboardScreen />
                    <Navbar />
                  </Box>
                )}
              </MainStack.Screen>
              <MainStack.Screen name="ETFDetails" options={{ headerTitle: 'Détails ETF' }}>
                {() => (
                  <Box flex={1}>
                    <ETFDetailScreen />
                  </Box>
                )}
              </MainStack.Screen>
              <MainStack.Screen name="ModuleScreen" options={{ headerTitle: '' }}>
                {() => <ModuleScreen />}
              </MainStack.Screen>
              <MainStack.Screen name="CompleteScreen" options={{ headerTitle: '' }}>
                {({ route }) => <CompleteScreen lessonId={route.params.lessonId} />}
              </MainStack.Screen>
            </MainStack.Navigator>
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  </NavigationContainer>
);
