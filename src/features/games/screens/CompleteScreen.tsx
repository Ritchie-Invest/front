import React from 'react';
import { SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '~/components/atoms/Button';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import CompletionSummary from '../components/CompletionSummary';
import { useCompletion } from '../hooks/useCompletion';

interface CompleteScreenProps {
  lessonId: string;
}

const CompleteScreen: React.FC<CompleteScreenProps> = ({ lessonId }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();

  const { data: stats, isLoading } = useCompletion(lessonId);

  const handleContinue = () => {
    queryClient.invalidateQueries({ queryKey: ['chapters', 'progress'] });

    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  // TODO: Retirer ces valeurs
  const xp = 25;
  const score = 50;
  const chrono = '0:06';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Box flex={1} alignItems="center" justifyContent="center" px={6}>
        <CompletionSummary
          xp={stats?.xp ?? xp}
          score={stats?.score ?? score}
          chrono={stats?.chrono ?? chrono}
        />
        <Button mt={10} w="100%" variant="primary" onPress={handleContinue}>
          Continuer
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default CompleteScreen;
