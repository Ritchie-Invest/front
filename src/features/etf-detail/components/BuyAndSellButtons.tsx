import React from 'react';
import { Box, HStack } from 'native-base';
import { Button } from '../../../components/atoms/Button';
import { useBuyAndSellButtons } from '../hooks/useBuyAndSellButtons';
import { ETFWithPriceHistory } from '../model/etfPriceData';

interface BuyAndSellButtonsProps {
  etfData: ETFWithPriceHistory | null;
  isLoading?: boolean;
}

export const BuyAndSellButtons: React.FC<BuyAndSellButtonsProps> = ({
  etfData,
  isLoading = false,
}) => {
  const { handleBuyPress, handleSellPress, isDisabled } = useBuyAndSellButtons({ etfData });

  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      p={4}
      borderTopWidth={1}
      borderTopColor="gray.200"
      safeAreaBottom
    >
      <HStack space={3} flex={1}>
        <Box flex={1}>
          <Button
            variant="primary"
            onPress={handleBuyPress}
            isLoading={isLoading}
            isDisabled={isDisabled || isLoading}
          >
            Acheter
          </Button>
        </Box>
        <Box flex={1}>
          <Button
            variant="secondary"
            onPress={handleSellPress}
            isLoading={isLoading}
            isDisabled={isDisabled || isLoading}
          >
            Vendre
          </Button>
        </Box>
      </HStack>
    </Box>
  );
};
