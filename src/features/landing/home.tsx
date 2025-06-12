import React from 'react';
import { Box, Text, VStack, HStack, Progress, ScrollView } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ChapterCard } from '~/components/organisms/chapterCard';
import { LessonCard } from '~/components/organisms/lessonCard';
import { Card } from '~/components/molecules/card';

const mockData = {
  user: {
    completedLevels: 1,
    totalLevels: 21,
  },
  chapters: [
    {
      id: '1',
      title: 'Chapitre 1 : Les Fondamentaux',
      description: 'Comprendre les bases absolues avant de toucher au moindre actif.',
      completedLessons: 1,
      totalLessons: 5,
    },
  ],
  lessons: [
    {
      id: '1-1',
      title: 'Épargne vs Investissement',
      description: 'Comprendre la différence entre épargner et investir.',
      status: 'completed' as const,
    },
    {
      id: '1-2',
      title: "Les Types d'Actifs",
      description: "Découvrir les différents types d'investissements disponibles.",
      status: 'available' as const,
    },
    {
      id: '1-3',
      title: 'Le Risque et le Rendement',
      description: 'Comprendre la relation fondamentale entre risque et rendement.',
      status: 'available' as const,
    },
  ],
};

const HomeScreen = () => {
  const { user, chapters, lessons } = mockData;
  const progressValue = Math.round(user.completedLevels / user.totalLevels) * 100;

  const handleLessonAction = (lessonId: string, action: 'start' | 'review') => {
    console.log(`Action: ${action} on lesson ${lessonId}`);
  };

  return (
    <Box flex={1} bg="white" safeArea>
      <ScrollView px={4} py={4}>
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
                {user.completedLevels} / {user.totalLevels} niveaux complétés
              </Text>
            </HStack>
          </HStack>
          <Progress value={progressValue} mt={3} colorScheme="blue" />
        </Card>

        {/* Chapitres */}
        {chapters.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            title={chapter.title}
            description={chapter.description}
            completedLessons={chapter.completedLessons}
            totalLessons={chapter.totalLessons}
          />
        ))}

        {/* Leçons */}
        <VStack space={3}>
          {lessons.map((lesson) => (
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
      </ScrollView>

      {/* Navigation Bas */}
    </Box>
  );
};

export default HomeScreen;
