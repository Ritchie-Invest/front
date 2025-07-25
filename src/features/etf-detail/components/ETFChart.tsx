import React from 'react';
import { Box, Text } from 'native-base';
import { View, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LineChart from 'react-native-simple-line-chart';
import { ETFPriceData } from '../model/etfPriceData';
import { formatPrice, formatDateForOverlay } from '../index';

interface ETFChartProps {
  priceHistory: ETFPriceData[];
}

export const ETFChart: React.FC<ETFChartProps> = ({ priceHistory }) => {
  const { chartData, selectedPoint, showOverlay, handlePointPress, hideOverlay, getSmartScale } =
    useETFChart(priceHistory);

  const screenWidth = Dimensions.get('window').width;
  const chartHeight = 280;

  const { max: maxValue, step } = getSmartScale();

  if (chartData.length === 0) {
    return (
      <Box bg="white" p={4} rounded="lg" shadow={1}>
        <Text textAlign="center" color="gray.500">
          Aucune donnée disponible
        </Text>
      </Box>
    );
  }

  return (
    <Box bg="white" p={4} rounded="lg" shadow={1} mb={4}>
      <Text fontSize="lg" fontWeight="semibold" mb={4} color="gray.800">
        Évolution du prix
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Box px={0} py={2} overflow="visible" alignItems="center">
          <LineChart
            data={chartData}
            width={screenWidth}
            height={chartHeight}
            color="#3B82F6"
            thickness={2}
            areaChart={true}
            startFillColor="#3B82F6"
            endFillColor="#E0F2FE"
            startOpacity={0.8}
            endOpacity={0.2}
            initialSpacing={25}
            endSpacing={25}
            spacing={Math.max(
              30,
              Math.floor((screenWidth - 100) / Math.max(chartData.length - 1, 1)),
            )}
            maxValue={maxValue}
            stepValue={step}
            noOfSections={5}
            yAxisColor="#E5E7EB"
            xAxisColor="#E5E7EB"
            yAxisTextStyle={{
              color: '#6B7280',
              fontSize: 11,
            }}
            xAxisLabelTextStyle={{
              color: '#6B7280',
              fontSize: 9,
              textAlign: 'center',
            }}
            hideRules={false}
            rulesType="solid"
            rulesColor="#F3F4F6"
            dataPointsColor="#3B82F6"
            dataPointsRadius={4}
            textShiftY={-5}
            textShiftX={0}
            textColor="#6B7280"
            textFontSize={9}
            focusEnabled={true}
            showDataPointOnFocus={true}
            showStripOnFocus={true}
            stripColor="#3B82F6"
            stripOpacity={0.3}
            stripWidth={2}
            showTextOnFocus={false}
            animateOnDataChange={true}
            animationDuration={300}
            curved={true}
            rotateLabel={true}
            formatYLabel={(value: string) => {
              const num = parseFloat(value);
              if (num >= 100000) {
                return `${Math.round(num / 1000)}k`;
              } else if (num >= 10000) {
                return `${Math.round(num / 1000)}k`;
              } else if (num >= 1000) {
                return `${Math.round(num / 100) * 100}`;
              } else {
                return Math.round(num).toString();
              }
            }}
            pointerConfig={{
              pointer1Color: '#3B82F6',
              pointer2Color: '#3B82F6',
              pointerStripUptoDataPoint: true,
              pointerStripColor: 'lightgray',
              pointerStripWidth: 2,
              strokeDashArray: [2, 5],
              activatePointersOnLongPress: false,
              activatePointersDelay: 150,
              pointerLabelComponent: (items: any) => {
                const index = items[0]?.index;
                if (index !== undefined && chartData[index]) {
                  setTimeout(() => handlePointPress(chartData[index]), 100);
                }
                return null;
              },
            }}
          />
        </Box>
      </ScrollView>

      <PriceOverlay isVisible={showOverlay} onClose={hideOverlay} dataPoint={selectedPoint} />
    </Box>
  );
};
