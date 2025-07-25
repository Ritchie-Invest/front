import React from 'react';
import { Box, Text } from 'native-base';

import { LineChartComponent } from './LineChart';
import { useLineChartComponentData } from '../hooks/useLineChartData';

interface LineChartContainerProps {
  priceHistory: any[];
}

export const LineChartContainer: React.FC<LineChartContainerProps> = ({ priceHistory }) => {
  const chartData = useLineChartComponentData(priceHistory);

  return (
    <Box bg="white" p={4} rounded="lg" shadow={1} mb={4}>
      <Text fontSize="lg" fontWeight="semibold" mb={4} color="gray.800">
        Évolution du prix
      </Text>
      <LineChartComponent data={chartData} />
    </Box>
  );
};
