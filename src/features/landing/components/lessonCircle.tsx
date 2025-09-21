import React from 'react';
import { TouchableOpacity } from 'react-native';
import { VStack, Icon } from '@gluestack-ui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Lesson } from '../models/responses/lesson';
import { useLessonCircle } from '../hooks/useLessonCircle';
import { borderRadius, paddings, spacing } from '~/lib/theme/theme';
import { NoLivesModal } from '~/features/life/components/NoLivesModal';

interface LessonCircleProps {
  lesson: Lesson;
  onAction: (lessonId: string, action: 'start') => void;
  isCurrent?: boolean;
}

export const LessonCircle: React.FC<LessonCircleProps> = ({
  lesson,
  onAction,
  isCurrent = false,
}) => {
  const { circleStyle, iconProps, handlePress, isDisabled, showNoLivesModal, handleCloseModal } =
    useLessonCircle(lesson, onAction, isCurrent);

  return (
    <>
      <VStack alignItems="center" width="100%">
        <TouchableOpacity
          onPress={handlePress}
          disabled={isDisabled}
          style={{
            aspectRatio: 1,
            width: '20%',
            borderRadius: borderRadius.borderRadiusCircle,
            backgroundColor: circleStyle.backgroundColor,
            justifyContent: 'center',
            padding: paddings.paddingVerySmall,
            alignItems: 'center',
            opacity: isDisabled ? 0.6 : 1,
          }}
        >
          <Icon as={() => <Ionicons name={iconProps.name} size={40} color={iconProps.color} />} />
        </TouchableOpacity>
      </VStack>

      <NoLivesModal
        isOpen={showNoLivesModal}
        onClose={handleCloseModal}
        shouldNavigateBack={false}
      />
    </>
  );
};
