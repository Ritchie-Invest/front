import React from 'react';
import { VStack, HStack, Text, Progress } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '../molecules/card';

interface ChapterCardProps {
  title: string;
  description: string;
  completedLessons: number;
  totalLessons: number;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  title,
  description,
  completedLessons,
  totalLessons,
}) => {
  const progressValue = Math.round(completedLessons / totalLessons) * 100;

  return (
    <Card variant="chapter" mb={4}>
      <VStack space={2}>
        <HStack space={2} alignItems="center">
          <Ionicons name="book" color="white" size={16} />
          <Text fontSize="lg" bold color="white">
            {title}
          </Text>
        </HStack>
        <Text color="white">{description}</Text>
        <Text color="white" fontSize="xs">
          {completedLessons}/{totalLessons} niveaux complétés
        </Text>
        <Progress value={progressValue} colorScheme="white" bg="white:alpha.30" />
      </VStack>
    </Card>
  );
};
