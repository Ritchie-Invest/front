import React from 'react';
import { HStack, Pressable, Text } from 'native-base';
import { DateRangeType, DATE_RANGE_OPTIONS } from '../index';

interface TimeRangeSelectorProps {
  selectedRange: DateRangeType;
  onRangeChange: (range: DateRangeType) => void;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedRange,
  onRangeChange,
}) => {
  return (
    <HStack space={2} justifyContent="center" mb={4}>
      {DATE_RANGE_OPTIONS.map((option) => (
        <Pressable
          key={option.value}
          onPress={() => onRangeChange(option.value)}
          bg={selectedRange === option.value ? 'blue.500' : 'gray.100'}
          px={4}
          py={2}
          rounded="md"
          _pressed={{
            opacity: 0.7,
          }}
        >
          <Text
            color={selectedRange === option.value ? 'white' : 'gray.700'}
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
