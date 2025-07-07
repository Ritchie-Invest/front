import React from 'react';
import { VStack, HStack, Text, Progress } from 'native-base';
import { useTranslation } from 'react-i18next';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Card } from '~/components/molecules/card';

interface HeroProps {
  progressValue: number;
  completedLessons: number;
  totalLessons: number;
}

export const Hero: React.FC<HeroProps> = ({ progressValue, completedLessons, totalLessons }) => {
  const { t } = useTranslation();

  return (
    <VStack space={6} mb={6}>
      {/* Titre et description */}
      <VStack space={2}>
        <HStack alignItems="center" space={2}>
          <FontAwesome5 name="bullseye" size={16} color="#ec4899" />
          <Text fontSize="xl" fontWeight="bold" color="blue.900">
            {t('home.hero.title')}
          </Text>
        </HStack>
        <Text fontSize="sm" color="gray.600">
          {t('home.hero.description')}
        </Text>
      </VStack>

      {/* Carte de progression */}
      <Card>
        <HStack justifyContent="space-between" alignItems="center">
          <Text bold>{t('home.hero.progressTitle')}</Text>
          <HStack alignItems="center" space={1}>
            <FontAwesome5 name="trophy" color="#eab308" size={16} />
            <Text>
              {completedLessons} / {totalLessons} {t('home.hero.levelsCompleted')}
            </Text>
          </HStack>
        </HStack>
        <Progress value={progressValue} mt={3} colorScheme="blue" />
      </Card>
    </VStack>
  );
};
