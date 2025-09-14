export enum BadgeType {
  PROG_FIRST_CHAPTER = 'PROG_FIRST_CHAPTER',
  PROG_5_LESSONS = 'PROG_5_LESSONS',
  PROG_50_PERCENT = 'PROG_50_PERCENT',
  LEARN_PERFECT_QUIZ = 'LEARN_PERFECT_QUIZ',
}

export const badgeTypeImageMap: Record<BadgeType, any> = {
  [BadgeType.LEARN_PERFECT_QUIZ]: require('../../../assets/images/badges/learn_perfect_quiz.webp'),
  [BadgeType.PROG_5_LESSONS]: require('../../../assets/images/badges/prog_5_lessons.webp'),
  [BadgeType.PROG_FIRST_CHAPTER]: require('../../../assets/images/badges/prog_first_chapter.webp'),
  [BadgeType.PROG_50_PERCENT]: require('../../../assets/images/badges/prog_50_percent.webp'),
};
