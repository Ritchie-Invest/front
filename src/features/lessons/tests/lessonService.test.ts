import { lessonsService } from '../services/lessonService'; // <-- Ajout de l'import

describe('lessonsService', () => {
  describe('getChaptersWithProgress', () => {
    it('should return all chapters with progress info', () => {
      const chapters = lessonsService.getChaptersWithProgress();
      expect(Array.isArray(chapters)).toBe(true);
      expect(chapters.length).toBeGreaterThan(0);
      chapters.forEach((chapter) => {
        expect(chapter).toHaveProperty('id');
        expect(chapter).toHaveProperty('title');
        expect(chapter).toHaveProperty('description');
        expect(chapter).toHaveProperty('completedLessons');
        expect(chapter).toHaveProperty('totalLessons');
        expect(['completed', 'current', 'locked']).toContain(chapter.status);
      });
    });
  });

  describe('getAllLessons', () => {
    it('should return all lessons with status', () => {
      const lessons = lessonsService.getAllLessons();
      expect(Array.isArray(lessons)).toBe(true);
      expect(lessons.length).toBeGreaterThan(0);
      lessons.forEach((lesson) => {
        expect(lesson).toHaveProperty('id');
        expect(lesson).toHaveProperty('chapterId');
        expect(lesson).toHaveProperty('title');
        expect(lesson).toHaveProperty('description');
        expect(['completed', 'current', 'locked']).toContain(lesson.status);
      });
    });
  });

  describe('getLessonsByChapter', () => {
    it('should return only lessons for the given chapter', () => {
      const chapterId = 1;
      const lessons = lessonsService.getLessonsByChapter(chapterId);
      expect(lessons.length).toBeGreaterThan(0);
      lessons.forEach((lesson) => {
        expect(lesson.chapterId).toBe(chapterId);
      });
    });

    it('should return empty array for chapter with no lessons', () => {
      const chapterId = 999;
      const lessons = lessonsService.getLessonsByChapter(chapterId);
      expect(Array.isArray(lessons)).toBe(true);
      expect(lessons.length).toBe(0);
    });
  });

  describe('getChapterById', () => {
    it('should return the correct chapter for a valid id', () => {
      const chapter = lessonsService.getChapterById(1);
      expect(chapter).toBeDefined();
      expect(chapter?.id).toBe(1);
    });

    it('should return undefined for an invalid id', () => {
      const chapter = lessonsService.getChapterById(999);
      expect(chapter).toBeUndefined();
    });
  });

  describe('getLessonById', () => {
    it('should return the correct lesson for a valid id', () => {
      const lesson = lessonsService.getLessonById(11);
      expect(lesson).toBeDefined();
      expect(lesson?.id).toBe(11);
    });

    it('should return undefined for an invalid id', () => {
      const lesson = lessonsService.getLessonById(999);
      expect(lesson).toBeUndefined();
    });
  });
});
