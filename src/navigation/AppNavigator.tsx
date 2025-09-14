import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingLayout } from '../features/onboarding/screens/OnboardingLayout';
import { LoginScreen } from '~/features/auth/screens/LoginScreen';
import { RegisterScreen } from '~/features/auth/screens/RegisterScreen';
import HomeScreen from '../features/landing/screens/home';
import { ETFDetailScreen } from '../features/etf-detail/screens/ETFDetailScreen';
import { ETFTransactionScreen } from '~/features/etf-transaction/screens/ETFTransactionScreen';
import { TransactionType } from '~/features/etf-transaction/types/TransactionType';
import { Screens } from '~/features/navigation/Type/Screens';
import { PortfolioDetailScreen } from '../features/etf-portfolio-detail/screens/PortfolioDetailScreen';
import { InvestmentDashboardScreen } from '~/features/investment-dashboard/screens/InvestmentDashboardScreen';
import BaseLayout from '~/components/organisms/components/BaseLayout';
import UserHeader from '~/features/user/components/userHeader';
import UserProfile from '~/features/user/screens/UserProfile';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
};

export type MainStackParamList = {
  [Screens.HOME]: undefined;
  [Screens.AUTH_LOGIN]: undefined;
  [Screens.AUTH_REGISTER]: undefined;
  [Screens.DASHBOARD]: undefined;
  [Screens.ETF_DETAILS]: { id: string };
  [Screens.TRANSACTION]: { transactionType: TransactionType };
  [Screens.PORTFOLIO]: undefined;
  [Screens.PROFILE]: undefined;
  [Screens.ONBOARDING]: undefined;
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
  onShowOnboarding,
}: {
  isOnboardingCompleted: boolean;
  showLogin: boolean;
  showRegister: boolean;
  handleLoginSuccess: () => void;
  handleOnboardingComplete: () => void;
  handleLogin: () => void;
  handleLogout: () => void;
  handleBackToLogin: () => void;
  onShowOnboarding?: () => void;
}) => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isOnboardingCompleted ? (
        showRegister ? (
          <Stack.Screen name={Screens.AUTH_REGISTER}>
            {() => (
              <BaseLayout
                children={
                  <RegisterScreen
                    onBackToLogin={handleBackToLogin}
                    onSuccess={handleLoginSuccess}
                  />
                }
                showNavbar={false}
              />
            )}
          </Stack.Screen>
        ) : showLogin ? (
          <Stack.Screen name={Screens.AUTH_LOGIN}>
            {() => (
              <BaseLayout
                children={
                  <LoginScreen
                    onLoginSuccess={handleLoginSuccess}
                    signupEnabled={false}
                    onShowOnboarding={onShowOnboarding}
                  />
                }
                showNavbar={false}
              />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name={Screens.ONBOARDING}>
            {() => <OnboardingLayout onComplete={handleOnboardingComplete} onLogin={handleLogin} />}
          </Stack.Screen>
        )
      ) : (
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => (
            <MainStack.Navigator
              screenOptions={{
                headerShown: true,
                headerTitle: () => <UserHeader />,
              }}
            >
              <MainStack.Screen name={Screens.HOME}>
                {() => <BaseLayout children={<HomeScreen />} />}
              </MainStack.Screen>
              <MainStack.Screen name={Screens.DASHBOARD}>
                {() => <BaseLayout children={<InvestmentDashboardScreen />} />}
              </MainStack.Screen>
              <MainStack.Screen name={Screens.ETF_DETAILS}>
                {() => <BaseLayout children={<ETFDetailScreen />} />}
              </MainStack.Screen>
              <MainStack.Screen name={Screens.TRANSACTION}>
                {() => <BaseLayout children={<ETFTransactionScreen />} />}
              </MainStack.Screen>
              <MainStack.Screen name={Screens.PORTFOLIO}>
                {() => <BaseLayout children={<PortfolioDetailScreen />} />}
              </MainStack.Screen>
              <MainStack.Screen name={Screens.PROFILE}>
                {() => <BaseLayout children={<UserProfile handleLogout={handleLogout} />} />}
              </MainStack.Screen>
            </MainStack.Navigator>
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  </NavigationContainer>
);
