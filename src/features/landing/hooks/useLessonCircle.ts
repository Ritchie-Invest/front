import { useMemo } from 'react';
import { Lesson } from '../models/responses/lesson';
import { LessonStatus } from '../types/LessonStatus';
import { colors } from '~/lib/theme/theme';

export interface LessonCircleStyle {
  backgroundColor: string;
  borderColor: string;
}

export interface LessonCircleIcon {
  name: 'lock-closed' | 'play' | 'checkmark' | 'star';
  color: string;
}

export interface LessonCircleState {
  isCompleted: boolean;
  isLocked: boolean;
  isUnlocked: boolean;
}

export interface UseLessonCircleReturn {
  state: LessonCircleState;
  circleStyle: LessonCircleStyle;
  iconProps: LessonCircleIcon;
  handlePress: () => void;
  isDisabled: boolean;
}

export const useLessonCircle = (
  lesson: Lesson,
  onAction: (lessonId: string, action: 'start' | 'review') => void,
  isCurrent: boolean = false,
): UseLessonCircleReturn => {
  const state = useMemo(
    (): LessonCircleState => ({
      isCompleted: lesson.status === LessonStatus.COMPLETED,
      isLocked: lesson.status === LessonStatus.LOCKED,
      isUnlocked: lesson.status === LessonStatus.UNLOCKED,
    }),
    [lesson.status],
  );

  const circleStyle = useMemo((): LessonCircleStyle => {
    if (state.isLocked) {
      return {
        backgroundColor: colors.Grey,
        borderColor: colors.DarkGrey,
      };
    }

    if (isCurrent) {
      return {
        backgroundColor: colors.primaryActionColor,
        borderColor: colors.primaryActionActiveColor,
      };
    }

    if (state.isCompleted) {
      return {
        backgroundColor: colors.successColor,
        borderColor: colors.successBackgroundColor,
      };
    }

    return {
      backgroundColor: colors.Grey,
      borderColor: colors.DarkGrey,
    };
  }, [state, isCurrent]);

  const iconProps = useMemo((): LessonCircleIcon => {
    if (state.isLocked) {
      return {
        name: 'lock-closed',
        color: colors.DarkGrey,
      };
    }

    if (isCurrent) {
      return {
        name: 'play',
        color: 'white',
      };
    }

    if (state.isCompleted) {
      return {
        name: 'checkmark',
        color: 'white',
      };
    }

    return {
      name: 'star',
      color: colors.DarkGrey,
    };
  }, [state, isCurrent]);

  const handlePress = useMemo(
    () => () => {
      if (!state.isLocked) {
        const action = state.isCompleted ? 'review' : 'start';
        onAction(lesson.id, action);
      }
    },
    [state.isLocked, state.isCompleted, onAction, lesson.id],
  );

  const isDisabled = state.isLocked;

  return {
    state,
    circleStyle,
    iconProps,
    handlePress,
    isDisabled,
  };
};
