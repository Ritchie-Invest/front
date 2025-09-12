import React, { useLayoutEffect } from 'react';
import { Button, ButtonText, ScrollView } from '@gluestack-ui/themed';
import { Hero } from '../components/hero';
import { ChaptersTimeline } from '../components/timeline';
import { useProgress } from '../hooks/useProgress';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../auth/store/authStore';
import PageCover from '~/components/organisms/components/PageCover';
import { Screens } from '~/features/navigation/Type/Screens';

const HomeScreen = ({ onLogout }: { onLogout: () => void }) => {
  const navigation = useNavigation();
  const logout = useAuthStore((s) => s.logout);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            logout();
            onLogout();
          }}
          variant="link"
        >
          <ButtonText>Déconnexion</ButtonText>
        </Button>
      ),
    });
  }, [navigation, logout, onLogout]);

  return (
    <>
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
