import React from 'react';
import { Box, Text } from 'native-base';

import { LineChartView } from './LineChartView';
import { useLineChartData } from '../hooks/useLineChartData';

interface ETFChartContainerProps {
  priceHistory: any[];
}

export const ETFChartContainer: React.FC<ETFChartContainerProps> = ({ priceHistory }) => {
  const chartData = useLineChartData(priceHistory);

  return (
    <Box bg="white" p={4} rounded="lg" shadow={1} mb={4}>
      <Text fontSize="lg" fontWeight="semibold" mb={4} color="gray.800">
        Évolution du prix
      </Text>
      <LineChartView data={chartData} />
    </Box>
  );
};
