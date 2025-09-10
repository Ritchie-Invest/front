import { useMemo } from 'react';
import { Chapter } from '../models/responses/chapter';
import { Lesson } from '../models/responses/lesson';

export interface LessonPosition {
  lesson: Lesson;
  position: 'left' | 'center' | 'right';
  positionStyle: {
    marginLeft: number;
    marginRight: number;
  };
  isCurrent: boolean;
}

export interface ChapterWithPositions {
  chapter: Chapter;
  lessons: LessonPosition[];
}

export interface UseTimelineReturn {
  chaptersWithPositions: ChapterWithPositions[];
}

interface UseTimelineProps {
  chapters: Chapter[];
  currentLesson: Lesson | null;
}

const getLessonXPosition = (lessonIndex: number): 'left' | 'center' | 'right' => {
  const cyclePosition = lessonIndex % 6;
  const cycleNumber = Math.floor(lessonIndex / 6);
  const isEvenCycle = cycleNumber % 2 === 0;

  const evenCyclePattern: ('left' | 'center' | 'right')[] = [
    'center',
    'left',
    'left',
    'left',
    'left',
    'center',
  ];
  const oddCyclePattern: ('left' | 'center' | 'right')[] = [
    'center',
    'right',
    'right',
    'right',
    'right',
    'center',
  ];

  return isEvenCycle ? evenCyclePattern[cyclePosition] : oddCyclePattern[cyclePosition];
};

const getPositionStyle = (position: 'left' | 'center' | 'right', isExtreme: boolean = false) => {
  const baseOffset = isExtreme ? 80 : 50;

  switch (position) {
    case 'left':
      return { marginLeft: -baseOffset, marginRight: baseOffset };
    case 'right':
      return { marginLeft: baseOffset, marginRight: -baseOffset };
    case 'center':
    default:
      return { marginLeft: 0, marginRight: 0 };
  }
};

export const useTimeline = ({ chapters, currentLesson }: UseTimelineProps): UseTimelineReturn => {
  const chaptersWithPositions = useMemo(() => {
    let globalLessonIndex = 0;

    return chapters.map((chapter) => {
      const lessons: LessonPosition[] = chapter.lessons.map((lesson) => {
        const position = getLessonXPosition(globalLessonIndex);
        const cyclePosition = globalLessonIndex % 6;
        const isExtreme = cyclePosition === 2 || cyclePosition === 3;
        const positionStyle = getPositionStyle(position, isExtreme);
        const isCurrent = currentLesson?.id === lesson.id;

        globalLessonIndex++;

        return {
          lesson,
          position,
          positionStyle,
          isCurrent,
        };
      });

      return {
        chapter,
        lessons,
      };
    });
  }, [chapters, currentLesson]);

  return {
    chaptersWithPositions,
  };
};
