import React from 'react';
import { VStack, HStack, Text, Icon } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '../molecules/card';
import { Button } from '../atoms/Button';
import { StatusBadge } from '../atoms/statusBadge';

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  status: 'available' | 'completed';
  onAction: (lessonId: string, action: 'start' | 'review') => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  id,
  title,
  description,
  status,
  onAction,
}) => {
  const isCompleted = status === 'completed';

  const handleButtonPress = () => {
    onAction(id, isCompleted ? 'review' : 'start');
  };

  return (
    <Card variant="lesson" mb={3}>
      <VStack space={3}>
        <HStack space={2} alignItems="center" mb={2}>
          <Icon
            as={Ionicons}
            name={isCompleted ? 'checkmark-circle' : 'play-circle-outline'}
            color={isCompleted ? 'green.500' : 'blue.500'}
            size="sm"
          />
          <Text bold>{id}</Text>
        </HStack>

        <VStack space={1}>
          <Text bold mb={1}>
            {title}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {description}
          </Text>
        </VStack>

        <HStack justifyContent="space-between" alignItems="center">
          <StatusBadge status={status} />
          <Button variant={isCompleted ? 'secondary' : 'primary'} onPress={handleButtonPress}>
            {isCompleted ? 'Revoir' : 'Commencer'}
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};
