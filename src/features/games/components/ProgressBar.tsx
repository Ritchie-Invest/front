import React from 'react';
import { Box } from 'native-base';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <Box flex={1} h={5} justifyContent="center">
    <Box bg="coolGray.200" h={5} w="100%" borderRadius={10} position="absolute" top={0} left={0} />
    <Box
      bg="yellow.400"
      h={5}
      w={`${progress * 100}%`}
      borderRadius={10}
      position="absolute"
      top={0}
      left={0}
    />
  </Box>
);

export default ProgressBar;
