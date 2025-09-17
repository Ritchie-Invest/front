import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { LineChartProps } from '../models/LineChart';
import { useLineChart } from '../hooks/useLineChart';
import { colors } from '~/lib/theme/theme';

export const LineChartComponent: React.FC<LineChartProps> = memo(
  ({ data, data2, config = {}, emptyStateText = 'Aucune donnée disponible' }) => {
    const { chartConfig, chartWidth, chartHeight, yAxisOffset, chartData, chartData2 } =
      useLineChart(data, data2, config);

    if (!data || data.length === 0) {
      return (
        <View
          style={{
            height: chartHeight,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>{emptyStateText}</Text>
        </View>
      );
    }

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <LineChart
          isAnimated
          animateOnDataChange
          textColor1={chartConfig.lineColor}
          textShiftY={-4}
          textColor2={chartConfig.lineColor2}
          areaChart
          data={chartData}
          data2={chartData2 || undefined}
          width={chartWidth}
          height={chartHeight}
          color={chartConfig.lineColor}
          color2={chartConfig.lineColor2}
          startFillColor={chartConfig.startFillColor}
          endFillColor={chartConfig.endFillColor}
          startFillColor2={chartConfig.startFillColor2}
          endFillColor2={chartConfig.endFillColor2}
          startOpacity={chartConfig.startOpacity}
          endOpacity={chartConfig.endOpacity}
          startOpacity2={chartConfig.startOpacity2}
          endOpacity2={chartConfig.endOpacity2}
          dataPointsColor={chartConfig.activePointColor}
          dataPointsColor2={chartConfig.activePointColor2}
          dataPointsRadius={chartConfig.endPointRadius}
          dataPointsRadius2={chartConfig.endPointRadius2}
          backgroundColor={chartConfig.backgroundColor}
          yAxisTextStyle={{ color: colors.Grey }}
          xAxisLabelTextStyle={{ color: colors.Grey }}
          yAxisOffset={yAxisOffset}
          curved
        />
      </View>
    );
  },
);
