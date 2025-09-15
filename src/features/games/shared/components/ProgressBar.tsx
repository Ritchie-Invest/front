import React from 'react';
import { Box, Progress } from 'native-base';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <Box bg="gray.200" borderRadius={10} overflow="hidden" h={5} w="100%">
    <Progress
      value={progress * 100}
      size="md"
      colorScheme="yellow"
      _filledTrack={{
        bg: 'yellow.400',
      }}
      h={5}
      borderRadius={10}
    />
  </Box>
);

export default ProgressBar;
