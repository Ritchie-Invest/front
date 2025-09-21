import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLifeSync } from '~/features/life/hooks/useLifeSync';
import { OnboardingLayout } from '../features/onboarding/screens/OnboardingLayout';
import { LoginScreen } from '~/features/auth/screens/LoginScreen';
import { RegisterScreen } from '~/features/auth/screens/RegisterScreen';
import HomeScreen from '../features/landing/screens/home';
import { ETFDetailScreen } from '../features/etf-detail/screens/ETFDetailScreen';
import { ETFTransactionScreen } from '~/features/etf-transaction/screens/ETFTransactionScreen';
import { TransactionType } from '~/features/etf-transaction/types/TransactionType';
import { Screen } from '~/features/navigation/Type/Screen';
import { PortfolioDetailScreen } from '../features/etf-portfolio-detail/screens/PortfolioDetailScreen';
import { InvestmentDashboardScreen } from '~/features/investment-dashboard/screens/InvestmentDashboardScreen';
import BaseLayout from '~/components/organisms/components/BaseLayout';
import UserHeader from '~/features/user/components/userHeader';
import UserProfile from '~/features/user/screens/UserProfile';
import ModuleScreen from '../features/games/screens/ModuleScreen';
import CompleteScreen from '../features/games/screens/CompleteScreen';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
  ModuleScreen: { lessonId: string; moduleId: string };
  CompleteScreen: {
    lessonId: string;
    completedModules?: number;
    totalModules?: number;
    xpWon?: number;
    isLessonCompleted?: boolean;
  };
};

export type MainStackParamList = {
  [Screen.HOME]: undefined;
  [Screen.DASHBOARD]: undefined;
  [Screen.ETF_DETAILS]: { id: string };
  [Screen.TRANSACTION]: { transactionType: TransactionType };
  [Screen.PORTFOLIO]: undefined;
  [Screen.PROFILE]: undefined;
  [Screen.MODULE_SCREEN]: {
    lessonId: string;
    moduleId: string;
    currentGameModuleIndex?: number;
    totalGameModules?: number;
    correctAnswers?: number;
  };
  [Screen.COMPLETE_SCREEN]: {
    lessonId: string;
    completedModules?: number;
    totalModules?: number;
    xpWon?: number;
    isLessonCompleted?: boolean;
  };
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
}) => {
  useLifeSync();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboardingCompleted ? (
          showRegister ? (
            <Stack.Screen name={Screen.AUTH_REGISTER}>
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
            <Stack.Screen name={Screen.AUTH_LOGIN}>
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
            <Stack.Screen name={Screen.ONBOARDING}>
              {() => (
                <OnboardingLayout onComplete={handleOnboardingComplete} onLogin={handleLogin} />
              )}
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
                <MainStack.Screen name={Screen.HOME}>
                  {() => <BaseLayout children={<HomeScreen />} />}
                </MainStack.Screen>
                <MainStack.Screen name={Screen.DASHBOARD}>
                  {() => <BaseLayout children={<InvestmentDashboardScreen />} />}
                </MainStack.Screen>
                <MainStack.Screen name={Screen.ETF_DETAILS}>
                  {() => <BaseLayout children={<ETFDetailScreen />} />}
                </MainStack.Screen>
                <MainStack.Screen name={Screen.TRANSACTION}>
                  {() => <BaseLayout children={<ETFTransactionScreen />} />}
                </MainStack.Screen>
                <MainStack.Screen name={Screen.PORTFOLIO}>
                  {() => <BaseLayout children={<PortfolioDetailScreen />} />}
                </MainStack.Screen>
                <MainStack.Screen name={Screen.PROFILE}>
                  {() => <BaseLayout children={<UserProfile handleLogout={handleLogout} />} />}
                </MainStack.Screen>
                <MainStack.Screen name={Screen.MODULE_SCREEN} options={{ headerTitle: '' }}>
                  {() => <BaseLayout children={<ModuleScreen />} />}
                </MainStack.Screen>
                <MainStack.Screen name={Screen.COMPLETE_SCREEN} options={{ headerTitle: '' }}>
                  {({ route }) => {
                    const params =
                      route.params as MainStackParamList[typeof Screen.COMPLETE_SCREEN];
                    return (
                      <BaseLayout
                        children={
                          <CompleteScreen
                            lessonId={params.lessonId}
                            completedModules={params.completedModules}
                            totalModules={params.totalModules}
                            xpWon={params.xpWon}
                            isLessonCompleted={params.isLessonCompleted}
                          />
                        }
                      />
                    );
                  }}
                </MainStack.Screen>
              </MainStack.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
