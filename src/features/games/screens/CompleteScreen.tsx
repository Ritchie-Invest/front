import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Box } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '~/components/atoms/Button';
import { spacing, colors } from '~/lib/theme/theme';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { Screen } from '../../navigation/Type/Screen';
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
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const queryClient = useQueryClient();

  const handleContinue = () => {
    queryClient.invalidateQueries({ queryKey: ['chapters', 'progress'] });

    navigation.navigate(Screen.HOME);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.mainBackgroundColor }}>
      <Box
        flex={1}
        alignItems="center"
        gap={spacing.spacingMedium}
        justifyContent="center"
        px={spacing.spacingSmall}
      >
        <CompletionSummary
          xp={xpWon}
          completedModules={completedModules}
          totalModules={totalModules}
          isSuccess={isLessonCompleted}
        />
        <Box mt={spacing.spacingExtraLarge} w="100%">
          <Button variant="primary" onPress={handleContinue}>
            {isLessonCompleted ? t('lesson.continue') : t('lesson.restart')}
          </Button>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default CompleteScreen;
