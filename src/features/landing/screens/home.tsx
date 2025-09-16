import React, { useLayoutEffect } from 'react';
import { ScrollView } from '@gluestack-ui/themed';
import { Hero } from '../components/hero';
import { ChaptersTimeline } from '../components/timeline';
import { useProgress } from '../hooks/useProgress';
import PageCover from '~/components/organisms/components/PageCover';
import { Screens } from '~/features/navigation/Type/Screens';

const HomeScreen = () => {
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
      <PageCover title="" Screen={Screens.HOME} size={100} />
      {showProgress && (
        <Hero
          chapterTitle={currentChapter?.title || 'Aucun chapitre disponible'}
          currentLesson={currentLesson}
        />
      )}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center' }}
        ref={autoScroll ? (scrollViewRef as any) : undefined}
      >
        <ChaptersTimeline
          chapters={chapters}
          currentLesson={currentLesson}
          currentChapter={currentChapter}
          onChapterLayout={handleChapterLayout}
          onLessonAction={handleLessonAction}
          scrollViewRef={scrollViewRef}
        />
      </ScrollView>
    </>
  );
};

export default HomeScreen;
