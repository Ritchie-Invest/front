import './i18n';
import { NativeBaseProvider, Box, Text } from 'native-base';
import { useColorScheme } from 'react-native';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NativeBaseProvider>
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        bg={colorScheme === 'dark' ? 'black' : 'white'}
      >
        <Text fontSize={24} color={colorScheme === 'dark' ? 'white' : 'black'}>
          Ritchie Invest
        </Text>
      </Box>
    </NativeBaseProvider>
  );
}
