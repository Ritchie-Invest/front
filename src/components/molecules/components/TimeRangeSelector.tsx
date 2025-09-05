import React, { memo, useMemo } from 'react';
import { HStack, Pressable, Text } from 'native-base';
import { TimeRangeOption, TimeRangeSelectorConfig } from '../models/TimeRange';

interface TimeRangeSelectorProps<T = string> {
  options: TimeRangeOption<T>[];
  selectedRange: T;
  onRangeChange: (range: T) => void;
  config?: TimeRangeSelectorConfig;
}

const defaultConfig: TimeRangeSelectorConfig = {
  activeColor: 'blue.500',
  inactiveColor: 'gray.100',
  activeTextColor: 'white',
  inactiveTextColor: 'gray.700',
  spacing: 2,
  justifyContent: 'center',
  marginBottom: 4,
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
      space={selectorConfig.spacing}
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
          px={4}
          py={2}
          rounded="md"
          _pressed={{
            opacity: 0.7,
          }}
        >
          <Text
            color={
              selectedRange === option.value
                ? selectorConfig.activeTextColor
                : selectorConfig.inactiveTextColor
            }
            fontSize="sm"
            fontWeight="medium"
          >
            {option.label}
          </Text>
        </Pressable>
      ))}
    </HStack>
  );
};

export const TimeRangeSelector = memo(TimeRangeSelectorImpl) as typeof TimeRangeSelectorImpl;
