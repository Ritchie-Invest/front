import React from 'react';
import { VStack, HStack, Text, Icon } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '~/components/molecules/card';
import { Button } from 'native-base';
import { StatusBadge } from '~/components/atoms/statusBadge';

interface LessonCardProps {
  id: number;
  title: string;
  description: string;
  status: 'available' | 'completed' | 'locked';
  onAction: (lessonId: number, action: 'start' | 'review') => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  id,
  title,
  description,
  status,
  onAction,
}) => {
  const isCompleted = status === 'completed';
  const isLocked = status === 'locked';

  const handleButtonPress = () => {
    if (!isLocked) {
      onAction(id, isCompleted ? 'review' : 'start');
    }
  };

  const getIconProps = () => {
    switch (status) {
      case 'completed':
        return {
          name: 'checkmark-circle' as const,
          color: 'green.500',
        };
      case 'available':
        return {
          name: 'play-circle-outline' as const,
          color: 'blue.500',
        };
      case 'locked':
        return {
          name: 'lock-closed' as const,
          color: 'gray.400',
        };
      default:
        return {
          name: 'play-circle-outline' as const,
          color: 'blue.500',
        };
    }
  };

  const iconProps = getIconProps();

  return (
    <Card
      variant="lesson"
      mb={3}
      opacity={isLocked ? 0.6 : 1}
      bg={isLocked ? 'gray.25' : 'green.50'}
      borderColor={isLocked ? 'gray.200' : 'green.200'}
    >
      <VStack space={3}>
        <HStack space={2} alignItems="center" mb={2}>
          <Icon as={Ionicons} name={iconProps.name} color={iconProps.color} size="sm" />
          <Text bold color={isLocked ? 'gray.500' : 'black'}>
            {id}
          </Text>
          {isLocked && (
            <Text
              fontSize="xs"
              bg="gray.200"
              px={2}
              py={1}
              rounded="md"
              color="gray.600"
              fontWeight="bold"
            >
              VERROUILLÉ
            </Text>
          )}
        </HStack>

        <VStack space={1}>
          <Text bold mb={1} color={isLocked ? 'gray.500' : 'black'}>
            {title}
          </Text>
          <Text fontSize="sm" color={isLocked ? 'gray.400' : 'gray.600'}>
            {description}
          </Text>
        </VStack>

        <HStack justifyContent="space-between" alignItems="center">
          <StatusBadge status={status} />
          {!isLocked && (
            <Button variant={isCompleted ? 'secondary' : 'primary'} onPress={handleButtonPress}>
              {isCompleted ? 'Revoir' : 'Commencer'}
            </Button>
          )}
        </HStack>

        {isLocked && (
          <Text fontSize="xs" color="gray.500" fontStyle="italic" mt={1}>
            Terminez la leçon précédente pour débloquer
          </Text>
        )}
      </VStack>
    </Card>
  );
};
