import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '~/components/atoms/Button';
import { RootStackParamList } from '../../../../navigation/AppNavigator';
import CompletionSummary from '../components/CompletionSummary';

interface CompleteScreenProps {
  lessonId: string;
  completedModules?: number;
  totalModules?: number;
  xpWon?: number;
  isLessonCompleted?: boolean;
}

const CompleteScreen: React.FC<CompleteScreenProps> = ({
  completedModules = 0,
  totalModules = 1,
  xpWon = 0,
  isLessonCompleted,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();

  const handleContinue = () => {
    queryClient.invalidateQueries({ queryKey: ['chapters', 'progress'] });

    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Box flex={1} alignItems="center" justifyContent="center" px={6}>
        <CompletionSummary
          xp={xpWon}
          completedModules={completedModules}
          totalModules={totalModules}
          isSuccess={isLessonCompleted}
        />
        <Button mt={10} w="100%" variant="primary" onPress={handleContinue}>
          {isLessonCompleted ? t('lesson.continue') : t('lesson.restart')}
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default CompleteScreen;
