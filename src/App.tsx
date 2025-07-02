import './i18n';
import { NativeBaseProvider, Box, Text } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import HomeScreen from './features/landing/screen/home';
import { OnboardingFlow } from './features/onboarding/screen/OnboardingFlow';

export default function App() {
  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  const handleOnboardingComplete = () => {
    setIsOnboardingCompleted(true);
  };

  const handleLogin = () => {
    setIsOnboardingCompleted(true);
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isOnboardingCompleted ? (
            <Stack.Screen name="Onboarding">
              {() => <OnboardingFlow onComplete={handleOnboardingComplete} onLogin={handleLogin} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
