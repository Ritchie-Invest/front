import React, { useLayoutEffect, useState } from 'react';
import { Badge, ScrollView } from '@gluestack-ui/themed';
import { Hero } from '../components/hero';
import { ChaptersTimeline } from '../components/timeline';
import { useProgress } from '../hooks/useProgress';
import PageCover from '~/components/organisms/components/PageCover';
import { Screens } from '~/features/navigation/Type/Screens';
import BadgeOverlay from '~/features/badges/components/badgeOverlay';
import { useGetBadges } from '~/features/badges/hooks/useGetBadges';
import { config } from '~/lib/config';

const HomeScreen = () => {
  const {
    chapters,
    currentLesson,
    currentChapter,
    scrollViewRef,
    handleChapterLayout,
    handleLessonAction,
  } = useProgress();
  const showBadgeOverlay = config.SHOW_BADGE_OVERLAY;

  const { Badges } = useGetBadges();

  const showProgress = true;
  const autoScroll = true;

  return (
    <>
      {Badges.length > 0 || (showBadgeOverlay && <BadgeOverlay visible={true} />)}
      <PageCover title="" Screen={Screens.HOME} size={200} />
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
