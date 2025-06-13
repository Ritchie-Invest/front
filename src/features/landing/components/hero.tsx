import React from 'react';
import { VStack, HStack, Text, Progress } from 'native-base';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Card } from '~/components/molecules/card';

interface HeroProps {
  progressValue: number;
  completedLessons: number;
  totalLessons: number;
}

export const Hero: React.FC<HeroProps> = ({ progressValue, completedLessons, totalLessons }) => {
  return (
    <VStack space={6} mb={6}>
      {/* Titre et description */}
      <VStack space={2}>
        <HStack alignItems="center" space={2}>
          <FontAwesome5 name="bullseye" size={16} color="#ec4899" />
          <Text fontSize="xl" fontWeight="bold" color="blue.900">
            Votre Parcours d'Investissement
          </Text>
        </HStack>
        <Text fontSize="sm" color="gray.600">
          Découvrez l'investissement étape par étape, du débutant complet à l'investisseur confirmé.
        </Text>
      </VStack>

      {/* Carte de progression */}
      <Card>
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
    </VStack>
  );
};
