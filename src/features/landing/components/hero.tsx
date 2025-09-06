import React from 'react';
import { VStack, HStack, Text, Progress } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Card } from '~/components/molecules/components/card';

interface HeroProps {
  progressValue: number;
  completedLessons: number;
  totalLessons: number;
}

export const Hero: React.FC<HeroProps> = ({ progressValue, completedLessons, totalLessons }) => {
  const { t } = useTranslation();

  return (
    <VStack space="lg" mb={6}>
      <VStack space="sm">
        <HStack alignItems="center" space="sm">
          <FontAwesome5 name="bullseye" size={16} color="#ec4899" />
          <Text fontSize={20} fontWeight="bold" color="$blue900">
            {t('home.hero.title')}
          </Text>
        </HStack>
        <Text fontSize={14} color="$text600">
          {t('home.hero.subtitle')}
        </Text>
      </VStack>

      <Card>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold">{t('home.hero.progressTitle')}</Text>
          <HStack alignItems="center" space="xs">
            <FontAwesome5 name="trophy" color="#eab308" size={16} />
            <Text>
              {completedLessons} / {totalLessons} {t('home.hero.levelsCompleted')}
            </Text>
          </HStack>
        </HStack>
        <Progress value={progressValue} mt={3} size="md" />
      </Card>
    </VStack>
  );
};
