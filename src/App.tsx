import './i18n';
import { NativeBaseProvider, Box, Text } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './features/landing/home';
export default function App() {
  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
