import React, { memo, useMemo } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LineChart from 'react-native-simple-line-chart';
import { LineChartConfig, LineChartProps } from '../models/LineChart';
import { borderRadius, colors, paddings, typography } from '~/lib/theme/theme';

const defaultConfig: LineChartConfig = {
  height: 240,
  lineColor: colors.primaryActionColor,
  activePointColor: colors.primaryActionColor,
  backgroundColor: colors.transparent,
  showVerticalLine: true,
  verticalLineColor: colors.GreyL20,
  endPointRadius: 4,
  animated: true,
};

export const LineChartComponent: React.FC<LineChartProps> = memo(
  ({ data, config = {}, emptyStateText = 'Aucune donnée disponible' }) => {
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

    return (
      <GestureHandlerRootView>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <LineChart
            lines={[
              {
                data,
                activePointConfig: {
                  color: chartConfig.activePointColor,
                  showVerticalLine: chartConfig.showVerticalLine,
                  verticalLineColor: chartConfig.verticalLineColor,
                },
                lineColor: chartConfig.lineColor,
                curve: 'linear',

                endPointConfig: {
                  color: chartConfig.activePointColor,
                  radius: chartConfig.endPointRadius,
                  animated: chartConfig.animated,
                },
                activePointComponent: (point: any) => {
                  return (
                    <View
                      style={{
                        backgroundColor: chartConfig.activePointColor,
                        padding: paddings.paddingSmall,
                        borderRadius: borderRadius.borderRadiusSmall,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.secondaryTextColor,
                          fontSize: typography.captionSize,
                          fontWeight: 'bold',
                        }}
                      >
                        {point?.extraData?.formattedValue}
                      </Text>
                      <Text
                        style={{
                          color: colors.secondaryTextColor,
                          fontSize: typography.overlineSize,
                        }}
                      >
                        {point?.extraData?.formattedTime}
                      </Text>
                    </View>
                  );
                },
              },
            ]}
            backgroundColor={chartConfig.backgroundColor}
            height={chartHeight}
            width={chartWidth}
          />
        </View>
      </GestureHandlerRootView>
    );
  },
);
