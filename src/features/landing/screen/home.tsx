import React, { useEffect, useRef, useState } from 'react';
import { Box, Text, VStack, HStack, Progress, ScrollView, View } from 'native-base';
import { ScrollView as RNScrollView } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ChapterCard } from '../components/chapterCard';
import { LessonCard } from '../components/lessonCard';
import { Card } from '~/components/molecules/card';
import { User } from '~/features/user/models/user';
import { Chapter } from '~/models/chapter';
import { Lesson } from '~/models/lesson';
const mockUser: User = {
  id: 1,
  name: 'Doe',
  first_name: 'John',
  email: 'john.doe@email.com',
  password: 'hashedpassword',
  role: 'student',
  created_at: new Date(),
  updated_at: new Date(),
  currentChapterId: 2,
};

const mockChapters: (Chapter & {
  completedLessons: number;
  totalLessons: number;
  status: 'completed' | 'current' | 'locked';
})[] = [
  {
    id: 1,
    title: 'Chapitre 1 : Les Fondamentaux',
    description: 'Comprendre les bases absolues avant de toucher au moindre actif.',
    lessons: [],
    completedLessons: 3,
    totalLessons: 3,
    status: 'completed',
  },
  {
    id: 2,
    title: "Chapitre 2 : Stratégies d'Investissement",
    description: 'Apprendre les différentes approches pour investir efficacement.',
    lessons: [],
    completedLessons: 0,
    totalLessons: 4,
    status: 'current',
  },
  {
    id: 3,
    title: 'Chapitre 3 : Analyse Financière',
    description: "Maîtriser l'analyse des entreprises et des marchés.",
    lessons: [],
    completedLessons: 0,
    totalLessons: 5,
    status: 'locked',
  },
  {
    id: 4,
    title: 'Chapitre 4 : Investissement Avancé',
    description: 'Techniques avancées et stratégies sophistiquées.',
    lessons: [],
    completedLessons: 0,
    totalLessons: 6,
    status: 'locked',
  },
];

const mockLessons: (Lesson & {
  chapterId: number;
  status: 'completed' | 'available' | 'locked';
})[] = [
  // Chapitre 1
  {
    id: 11,
    chapterId: 1,
    title: 'Épargne vs Investissement',
    description: 'Comprendre la différence entre épargner et investir.',
    games: [],
    status: 'completed',
  },
  {
    id: 12,
    chapterId: 1,
    title: "Les Types d'Actifs",
    description: "Découvrir les différents types d'investissements disponibles.",
    games: [],
    status: 'completed',
  },
  {
    id: 13,
    chapterId: 1,
    title: 'Le Risque et le Rendement',
    description: 'Comprendre la relation fondamentale entre risque et rendement.',
    games: [],
    status: 'completed',
  },
  // Chapitre 2
  {
    id: 21,
    chapterId: 2,
    title: 'Diversification du Portefeuille',
    description: 'Apprendre à répartir ses investissements pour réduire les risques.',
    games: [],
    status: 'available',
  },
  {
    id: 22,
    chapterId: 2,
    title: 'Investissement Passif vs Actif',
    description: "Comparer les stratégies d'investissement passives et actives.",
    games: [],
    status: 'locked',
  },
  {
    id: 23,
    chapterId: 2,
    title: 'Les ETF et Fonds Indiciels',
    description: 'Comprendre les fonds négociés en bourse et leur utilité.',
    games: [],
    status: 'locked',
  },
  {
    id: 24,
    chapterId: 2,
    title: 'Rééquilibrage du Portefeuille',
    description: "Maintenir l'allocation d'actifs souhaitée au fil du temps.",
    games: [],
    status: 'locked',
  },
  // Chapitre 3
  {
    id: 31,
    chapterId: 3,
    title: 'Analyse Fondamentale',
    description: 'Évaluer la valeur intrinsèque des entreprises.',
    games: [],
    status: 'locked',
  },
  {
    id: 32,
    chapterId: 3,
    title: 'Ratios Financiers',
    description: 'Interpréter les indicateurs clés de performance financière.',
    games: [],
    status: 'locked',
  },
];

const HomeScreen = () => {
  const user = mockUser;
  const chapters = mockChapters;
  const lessons = mockLessons;
  const completedLessons = chapters.reduce((sum, chapter) => sum + chapter.completedLessons, 0);
  const totalLessons = chapters.reduce((sum, chapter) => sum + chapter.totalLessons, 0);
  const progressValue = Math.round((completedLessons / totalLessons) * 100);

  const scrollViewRef = useRef<RNScrollView>(null);
  const [chapterLayouts, setChapterLayouts] = useState<Record<number, number>>({});

  // Méthode pour enregistrer la position de chaque chapitre
  const handleChapterLayout = (chapterId: number, event: any) => {
    const { y } = event.nativeEvent.layout;
    setChapterLayouts((prev) => ({
      ...prev,
      [chapterId]: y,
    }));
  };

  // Auto-scroll vers le chapitre actuel
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentChapterY = chapterLayouts[user.currentChapterId];
      if (currentChapterY !== undefined && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          y: Math.max(0, currentChapterY - 100), // Offset de 100px
          animated: true,
        });
      }
    }, 800); // Délai plus long pour s'assurer que les layouts sont calculés

    return () => clearTimeout(timer);
  }, [chapterLayouts, user.currentChapterId]);

  const handleLessonAction = (lessonId: number, action: 'start' | 'review') => {
    console.log(`Action: ${action} on lesson ${lessonId}`);
  };

  return (
    <Box flex={1} bg="white" safeArea>
      <ScrollView ref={scrollViewRef} px={4} py={4}>
        {/* Titre */}
        <VStack space={2} mb={6}>
          <HStack alignItems="center" space={2}>
            <FontAwesome5 name="bullseye" size={16} color="#ec4899" />
            <Text fontSize="xl" fontWeight="bold" color="blue.900">
              Votre Parcours d'Investissement
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Découvrez l'investissement étape par étape, du débutant complet à l'investisseur
            confirmé.
          </Text>
        </VStack>

        {/* Progression */}
        <Card mb={6}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text bold>Votre Progression</Text>
            <HStack alignItems="center" space={1}>
              <FontAwesome5 name="trophy" color="#eab308" size={16} />
              <Text>
                {completedLessons} / {totalLessons} niveaux complétés
              </Text>
            </HStack>
          </HStack>
          <Progress value={progressValue} mt={3} colorScheme="blue" />
        </Card>

        {/* Chapitres et Leçons */}
        {chapters.map((chapter) => (
          <React.Fragment key={chapter.id}>
            <View onLayout={(event) => handleChapterLayout(chapter.id, event)}>
              <ChapterCard
                title={chapter.title}
                description={chapter.description}
                completedLessons={chapter.completedLessons}
                totalLessons={chapter.totalLessons}
                status={chapter.status}
              />
            </View>

            {/* Leçons du chapitre */}
            <VStack space={3} mb={6} mx={2}>
              {lessons
                .filter((lesson) => lesson.chapterId === chapter.id)
                .map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    id={lesson.id}
                    title={lesson.title}
                    description={lesson.description}
                    status={lesson.status}
                    onAction={handleLessonAction}
                  />
                ))}
            </VStack>
          </React.Fragment>
        ))}
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
