import React from 'react';
import { VStack, HStack, Text, Icon } from 'native-base';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '~/components/molecules/card';
import { Button } from 'native-base';
import { StatusBadge } from '~/components/atoms/statusBadge';
import { Lesson } from '../models/responses/lesson';
import { LessonStatus } from '../types/LessonStatus';

interface LessonCardProps {
  lesson: Lesson;
  onAction: (lessonId: string, action: 'start' | 'restart' | 'continue') => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onAction }) => {
  const { t } = useTranslation();

  const { id, title, description, status } = lesson;

  const isLocked = status === LessonStatus.LOCKED;

  const handleButtonPress = () => {
    if (status === LessonStatus.UNLOCKED) {
      onAction(id, 'start');
    }
  };

  const getIconProps = () => {
    switch (status) {
      case LessonStatus.COMPLETED:
        return {
          name: 'checkmark-circle' as const,
          color: 'green.500',
        };
      case LessonStatus.UNLOCKED:
        return {
          name: 'play-circle-outline' as const,
          color: 'blue.500',
        };
      case LessonStatus.LOCKED:
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
              {t('status.progress.locked').toUpperCase()}
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
            <Button
              variant={status === LessonStatus.COMPLETED ? 'secondary' : 'primary'}
              onPress={handleButtonPress}
              isDisabled={status === LessonStatus.COMPLETED}
              opacity={status === LessonStatus.COMPLETED ? 0.5 : 1}
            >
              {status === LessonStatus.COMPLETED ? t('lesson.completed') : t('lesson.start')}
            </Button>
          )}
        </HStack>

        {isLocked && (
          <Text fontSize="xs" color="gray.500" fontStyle="italic" mt={1}>
            {t('lesson.unlockMessage')}
          </Text>
        )}
      </VStack>
    </Card>
  );
};
