import React, { memo, useMemo } from 'react';
import { HStack, Pressable, Text } from '@gluestack-ui/themed';
import { TimeRangeOption, TimeRangeSelectorConfig } from '../models/TimeRange';
import { borderRadius, colors, margins, paddings, typography } from '~/lib/theme/theme';
import { spacing } from '~/lib/theme/values/spacing';

interface TimeRangeSelectorProps<T = string> {
  options: TimeRangeOption<T>[];
  selectedRange: T;
  onRangeChange: (range: T) => void;
  config?: TimeRangeSelectorConfig;
}

const defaultConfig: TimeRangeSelectorConfig = {
  activeColor: colors.primaryActionColor,
  inactiveColor: colors.GreyL20,
  activeTextColor: colors.primaryActionColor,
  inactiveTextColor: colors.GreyL30,
  spacing: spacing.spacingMinimum,
  justifyContent: 'center',
  marginBottom: margins.marginSmall,
};

const TimeRangeSelectorImpl = <T extends string | number>({
  options,
  selectedRange,
  onRangeChange,
  config = {},
}: TimeRangeSelectorProps<T>) => {
  const selectorConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);

  return (
    <HStack
      space={spacing.spacingSmallFallback}
      justifyContent={selectorConfig.justifyContent}
      mb={selectorConfig.marginBottom}
    >
      {options.map((option) => (
        <Pressable
          key={String(option.value)}
          onPress={() => onRangeChange(option.value)}
          bg={
            selectedRange === option.value
              ? selectorConfig.activeColor
              : selectorConfig.inactiveColor
          }
          p={paddings.paddingVerySmall}
          rounded={borderRadius.borderRadiusVerySmall}
          $pressed={{
            opacity: 0.7,
          }}
        >
          <Text
            color={
              selectedRange === option.value
                ? selectorConfig.activeTextColor
                : selectorConfig.inactiveTextColor
            }
            fontSize={typography.bodySize}
            fontWeight={typography.fontWeightMedium}
          >
            {option.label}
          </Text>
        </Pressable>
      ))}
    </HStack>
  );
};

export const TimeRangeSelector = memo(TimeRangeSelectorImpl) as typeof TimeRangeSelectorImpl;
