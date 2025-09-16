import { ChaptersAndLessonsResponse, Chapter } from '../models/responses/chapter';
import { Lesson } from '../models/responses/lesson';
import { ChapterStatus } from '../types/ChapterStatus';
import { LessonStatus } from '../types/LessonStatus';

const isValidString = (value: any): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

const isValidPositiveNumber = (value: any): value is number => {
  return typeof value === 'number' && value >= 0;
};

const isValidChapterStatus = (status: any): status is ChapterStatus => {
  return Object.values(ChapterStatus).includes(status);
};

const isValidLessonStatus = (status: any): status is LessonStatus => {
  return Object.values(LessonStatus).includes(status);
};

export const validateLesson = (lesson: any): lesson is Lesson => {
  if (!lesson || typeof lesson !== 'object') {
    return false;
  }

  return (
    isValidString(lesson.id) &&
    isValidString(lesson.title) &&
    isValidString(lesson.description) &&
    isValidPositiveNumber(lesson.order) &&
    isValidLessonStatus(lesson.status) &&
    (lesson.gameModuleId === null || isValidString(lesson.gameModuleId))
  );
};

export const validateChapter = (chapter: any): chapter is Chapter => {
  if (!chapter || typeof chapter !== 'object') {
    return false;
  }

  const hasValidBasicFields =
    isValidString(chapter.id) &&
    isValidString(chapter.title) &&
    isValidString(chapter.description) &&
    isValidPositiveNumber(chapter.order) &&
    isValidChapterStatus(chapter.status) &&
    isValidPositiveNumber(chapter.completedLessons) &&
    isValidPositiveNumber(chapter.totalLessons);

  if (!hasValidBasicFields) {
    return false;
  }

  if (chapter.completedLessons > chapter.totalLessons) {
    return false;
  }

  if (!Array.isArray(chapter.lessons)) {
    return false;
  }

  return chapter.lessons.every(validateLesson);
};

export const validateProgressData = (data: any): data is ChaptersAndLessonsResponse => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  if (!Array.isArray(data.chapters)) {
    return false;
  }

  return data.chapters.every(validateChapter);
};

export const validateProgressDataConsistency = (data: ChaptersAndLessonsResponse): boolean => {
  for (const chapter of data.chapters) {
    if (chapter.lessons.length !== chapter.totalLessons) {
      console.warn(
        `Chapter ${chapter.id}: lessons array length (${chapter.lessons.length}) doesn't match totalLessons (${chapter.totalLessons})`,
      );
      return false;
    }

    const actualCompletedLessons = chapter.lessons.filter(
      (lesson) => lesson.status === LessonStatus.COMPLETED,
    ).length;

    if (chapter.completedLessons !== actualCompletedLessons) {
      console.warn(
        `Chapter ${chapter.id}: completedLessons (${chapter.completedLessons}) doesn't match actual completed lessons count (${actualCompletedLessons})`,
      );
      return false;
    }

    for (let i = 0; i < chapter.lessons.length - 1; i++) {
      if (chapter.lessons[i].order >= chapter.lessons[i + 1].order) {
        console.warn(`Chapter ${chapter.id}: lessons are not properly ordered`);
        return false;
      }
    }
  }

  for (let i = 0; i < data.chapters.length - 1; i++) {
    if (data.chapters[i].order >= data.chapters[i + 1].order) {
      console.warn('Chapters are not properly ordered');
      return false;
    }
  }

  return true;
};
