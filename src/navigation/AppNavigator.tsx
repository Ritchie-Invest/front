import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box } from 'native-base';
import { OnboardingFlow } from '../features/onboarding/screens/OnboardingFlow';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../features/auth/screens/RegisterScreen';
import HomeScreen from '../features/landing/screens/home';
import { InvestmentDashboardScreen } from '../features/investment-dashboard/screens/InvestmentDashboardScreen';
import Navbar from '../components/organisms/navbar';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
};

export type MainStackParamList = {
  Landing: undefined;
  InvestmentDashboard: undefined;
  Progress: undefined;
  Profile: undefined;
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
            {() => <OnboardingFlow onComplete={handleOnboardingComplete} onLogin={handleLogin} />}
          </Stack.Screen>
        )
      ) : (
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => (
            <Box flex={1} safeArea>
              <MainStack.Navigator
                screenOptions={{
                  headerShown: true,
                  headerTitle: '',
                }}
              >
                <MainStack.Screen name="Landing">
                  {() => <HomeScreen onLogout={handleLogout} />}
                </MainStack.Screen>
                <MainStack.Screen name="InvestmentDashboard" options={{ headerTitle: 'Portfolio' }}>
                  {() => <InvestmentDashboardScreen />}
                </MainStack.Screen>
              </MainStack.Navigator>
              <Navbar />
            </Box>
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  </NavigationContainer>
);
