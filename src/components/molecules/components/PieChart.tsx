import React, { memo, useMemo } from 'react';
import { View, Text, Dimensions, Pressable } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
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
  ({ data, config = {}, emptyStateText = 'Aucune donnée disponible', onPress }) => {
    const chartConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);
    const screenWidth = Dimensions.get('screen').width;

    const chartSize = screenWidth * 0.6;

    const chartData = useMemo(() => {
      if (data.length === 0) return [];

      return data.map((item, index) => ({
        value: item.value,
        color: item.color || chartConfig.defaultColors![index % chartConfig.defaultColors!.length],
        text: item.label,
        label: item.label,
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

    return (
      <View style={{ alignItems: 'center', width: '100%' }}>
        <Pressable onPress={onPress}>
          <PieChart
            data={chartData}
            radius={chartSize / 2}
            textColor={colors.primaryTextColor}
            textSize={typography.bodySize}
            fontWeight="bold"
            showText={false}
            showTextBackground={true}
            showTooltip={true}
            tooltipBackgroundColor={colors.mainBackgroundColor}
          />
        </Pressable>
      </View>
    );
  },
);

PieChartComponent.displayName = 'PieChartComponent';
