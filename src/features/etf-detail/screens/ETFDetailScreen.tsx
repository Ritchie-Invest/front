import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack } from 'native-base';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { ETFDetails } from '../components/ETFDetails';
import { ETFChart } from '../components/ETFChart';
import { useETFDetailStore } from '../store/ETFDetailStore';

type ETFDetailScreenRouteProp = RouteProp<MainStackParamList, 'ETFDetails'>;

export const ETFDetailScreen: React.FC = () => {
  const route = useRoute<ETFDetailScreenRouteProp>();
  const { setETFId } = useETFDetailStore();

  useEffect(() => {
    if (route.params?.id) {
      setETFId(route.params.id);
    }
  }, [route.params?.id, setETFId]);

  return (
    <Box flex={1} bg="white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack space={4} p={4} pb={8}>
          <ETFDetails />
          <ETFChart />
        </VStack>
      </ScrollView>
    </Box>
  );
};
