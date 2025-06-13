// /src/screens/HomeScreen.tsx (version refactorisée)
import React from 'react';
import { Box } from 'native-base';
import { LessonsOverview } from '../components/overview';

const HomeScreen = () => {
  return (
    <Box flex={1} safeArea>
      <LessonsOverview />
    </Box>
  );
};

export default HomeScreen;
