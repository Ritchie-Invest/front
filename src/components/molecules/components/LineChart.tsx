import React, { memo, useMemo } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { LineChartConfig, LineChartProps } from '../models/LineChart';
import { borderRadius, colors, paddings, typography } from '~/lib/theme/theme';

const defaultConfig: LineChartConfig = {
  height: 240,
  lineColor: colors.primaryActionColor,
  lineColor2: colors.warningColor,
  activePointColor: colors.primaryActionColor,
  activePointColor2: colors.warningColor,
  backgroundColor: colors.transparent,
  showVerticalLine: true,
  verticalLineColor: colors.GreyL20,
  endPointRadius: 4,
  endPointRadius2: 4,
  showDataPoints: true,
  showDataPoints2: true,
  animated: true,
  startFillColor: colors.primaryActionColor,
  endFillColor: colors.transparent,
  startFillColor2: colors.warningColor,
  endFillColor2: colors.transparent,
  startOpacity: 0.8,
  endOpacity: 0.1,
  startOpacity2: 0.8,
  endOpacity2: 0.1,
};

export const LineChartComponent: React.FC<LineChartProps> = memo(
  ({ data, data2, config = {}, emptyStateText = 'Aucune donnée disponible' }) => {
    const chartConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);
    const screenWidth = Dimensions.get('screen').width;
    const chartWidth = screenWidth * 0.8;
    const chartHeight = chartWidth * 0.8;

    if (data.length === 0) {
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

    const chartData = useMemo(() => {
      return data.map((point) => ({
        value: point.y,
        dataPointText: point.extraData?.formattedValue || point.y.toString(),
        label: point.extraData?.formattedTime,
        dataPointColor: chartConfig.activePointColor,
        dataPointRadius: chartConfig.endPointRadius,
        hideDataPoint: !chartConfig.showDataPoints,
      }));
    }, [data, chartConfig.activePointColor, chartConfig.endPointRadius]);

    const chartData2 = useMemo(() => {
      if (!data2 || data2.length === 0) return null;
      return data2.map((point) => ({
        value: point.y,
        dataPointText: point.extraData?.formattedValue || point.y.toString(),
        label: point.extraData?.formattedTime,
        dataPointColor: chartConfig.activePointColor2,
        dataPointRadius: chartConfig.endPointRadius2,
        hideDataPoint: !chartConfig.showDataPoints2,
      }));
    }, [data2, chartConfig.activePointColor2, chartConfig.endPointRadius2]);

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <LineChart
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
        />
      </View>
    );
  },
);
