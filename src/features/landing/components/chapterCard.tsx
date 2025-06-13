import React from 'react';
import { View } from 'react-native';
import { VStack, HStack, Text, Progress } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '~/components/molecules/card';

interface ChapterCardProps {
  title: string;
  description: string;
  completedLessons: number;
  totalLessons: number;
  status: 'completed' | 'current' | 'locked';
}

export const ChapterCard = React.forwardRef<any, ChapterCardProps>((props, ref) => {
  const { title, description, completedLessons, totalLessons, status, ...rest } = props;

  const progressValue = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const getStatusProps = () => {
    switch (status) {
      case 'completed':
        return {
          cardVariant: 'chapter' as const,
          iconName: 'checkmark-circle' as const,
          iconColor: 'white',
          textColor: 'white',
          progressColorScheme: 'white',
          progressBg: 'white:alpha.30',
          opacity: 1,
        };
      case 'current':
        return {
          cardVariant: 'chapter' as const,
          iconName: 'book' as const,
          iconColor: 'white',
          textColor: 'white',
          progressColorScheme: 'white',
          progressBg: 'white:alpha.30',
          opacity: 1,
        };
      case 'locked':
        return {
          cardVariant: 'default' as const,
          iconName: 'lock-closed' as const,
          iconColor: 'gray.400',
          textColor: 'gray.400',
          progressColorScheme: 'gray',
          progressBg: 'gray.200',
          opacity: 0.6,
        };
      default:
        return {
          cardVariant: 'chapter' as const,
          iconName: 'book' as const,
          iconColor: 'white',
          textColor: 'white',
          progressColorScheme: 'white',
          progressBg: 'white:alpha.30',
          opacity: 1,
        };
    }
  };

  const statusProps = getStatusProps();

  return (
    <View ref={ref}>
      <Card
        variant={statusProps.cardVariant}
        mb={4}
        opacity={statusProps.opacity}
        borderWidth={status === 'locked' ? 1 : 0}
        borderColor={status === 'locked' ? 'gray.300' : 'transparent'}
        bg={
          status === 'locked'
            ? 'gray.50'
            : status === 'completed'
              ? 'emerald.500'
              : status === 'current'
                ? 'blue.600'
                : undefined
        }
      >
        <VStack space={2}>
          <HStack space={2} alignItems="center">
            <Ionicons name={statusProps.iconName} color={statusProps.iconColor} size={16} />
            <Text fontSize="lg" bold color={statusProps.textColor}>
              {title}
            </Text>
            {status === 'current' && (
              <Text
                fontSize="xs"
                bg="white:alpha.30"
                px={2}
                py={1}
                rounded="md"
                color="white"
                fontWeight="bold"
              >
                EN COURS
              </Text>
            )}
          </HStack>
          <Text color={statusProps.textColor} opacity={status === 'locked' ? 0.7 : 1}>
            {description}
          </Text>
          <Text color={statusProps.textColor} fontSize="xs" opacity={status === 'locked' ? 0.7 : 1}>
            {completedLessons}/{totalLessons} niveaux complétés
          </Text>
          <Progress
            value={progressValue}
            colorScheme={statusProps.progressColorScheme}
            bg={statusProps.progressBg}
            opacity={status === 'locked' ? 0.5 : 1}
          />
          {status === 'locked' && (
            <Text fontSize="xs" color="gray.500" fontStyle="italic">
              Terminez le chapitre précédent pour débloquer
            </Text>
          )}
        </VStack>
      </Card>
    </View>
  );
});
