import React from 'react';
import { ScrollView, VStack } from '@gluestack-ui/themed';
import { Hero } from '../components/hero';
import { ChaptersTimeline } from '../components/timeline';
import { useProgress } from '../hooks/useProgress';
import PageCover from '~/components/organisms/components/PageCover';
import BadgeOverlay from '~/features/badges/components/badgeOverlay';
import { Screen } from '~/features/navigation/Type/Screen';

const HomeScreen: React.FC = () => {
  const {
    chapters,
    currentLesson,
    currentChapter,
    scrollViewRef,
    handleChapterLayout,
    handleLessonAction,
  } = useProgress();

  const showProgress = true;
  const autoScroll = true;

  return (
    <>
      <BadgeOverlay />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center' }}
        ref={autoScroll ? (scrollViewRef as any) : undefined}
      >
        <PageCover title="" Screen={Screen.HOME} size={250} />
        {showProgress && (
          <Hero
            chapterTitle={currentChapter?.title || 'Aucun chapitre disponible'}
            currentLesson={currentLesson}
          />
        )}
        <VStack>
          <ChaptersTimeline
            chapters={chapters}
            currentLesson={currentLesson}
            currentChapter={currentChapter}
            onChapterLayout={handleChapterLayout}
            onLessonAction={handleLessonAction}
            scrollViewRef={scrollViewRef}
          />
        </VStack>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
