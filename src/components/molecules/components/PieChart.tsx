import React, { memo, useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { PieChartConfig, PieChartProps } from '../models/PieChart';
import { borderRadius, colors, paddings, spacing, typography } from '~/lib/theme/theme';

const defaultColors = [
  colors.primaryActionColor,
  colors.successColor,
  colors.warningColor,
  colors.errorColor,
  colors.infoColor,
  colors.secondaryActionColor,
];

const defaultConfig: PieChartConfig = {
  size: 200,
  strokeWidth: 0,
  showLabels: true,
  showPercentage: true,
  backgroundColor: colors.transparent,
  animated: true,
  labelTextColor: colors.primaryTextColor,
  labelFontSize: typography.captionSize,
  defaultColors,
};

export const PieChartComponent: React.FC<PieChartProps> = memo(
  ({ data, config = {}, emptyStateText = 'Aucune donnée disponible' }) => {
    const chartConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);
    const screenWidth = Dimensions.get('screen').width;

    const chartSize = screenWidth * 0.6;

    const chartData = useMemo(() => {
      if (data.length === 0) return [];

      return data.map((item, index) => ({
        ...item,
        color: item.color || chartConfig.defaultColors![index % chartConfig.defaultColors!.length],
      }));
    }, [data, chartConfig.defaultColors]);

    if (data.length === 0) {
      return (
        <View
          style={{
            height: chartSize,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: chartConfig.labelTextColor }}>{emptyStateText}</Text>
        </View>
      );
    }

    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    return (
      <View style={{ alignItems: 'center', width: '100%' }}>
        <View>
          <PieChart
            widthAndHeight={chartSize}
            series={chartData.map((item) => ({
              value: item.value,
              color: item.color!,
              label: {
                text: item.formattedValue || item.value.toString(),
                fill: 'white',
                fontSize: 14,
                fontWeight: 'bold',
              },
            }))}
          />
        </View>

        <View
          style={{
            marginTop: paddings.paddingMedium,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {chartData.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.spacingVerySmall,
                paddingHorizontal: paddings.paddingMedium,
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: item.color,
                  borderRadius: borderRadius.borderRadiusVerySmall,
                }}
              />
              <Text
                style={{
                  color: chartConfig.labelTextColor,
                  fontSize: chartConfig.labelFontSize,
                  fontWeight: typography.fontWeightBoldFallback,
                }}
              >
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  },
);

PieChartComponent.displayName = 'PieChartComponent';
