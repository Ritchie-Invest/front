import React, { useState, useEffect } from 'react';
import { VStack, Text, HStack, Center, Box, AlertDialog, Button as NBButton } from 'native-base';
import { TextInput, Dimensions } from 'react-native';
import { Button } from '../../../components/atoms/Button';
import { ETFWithPriceHistory } from '../../etf-detail/model/etfPriceData';
import { TransactionType } from '../types/Transaction';
import { TransactionRequest } from '../models/Request';

const screenWidth = Dimensions.get('window').width;

interface SimpleTransactionFormProps {
  etfData: ETFWithPriceHistory;
  action: TransactionType;
  onSubmit: (order: TransactionRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const SimpleTransactionForm: React.FC<SimpleTransactionFormProps> = ({
  etfData,
  action,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [amount, setAmount] = useState('');
  const [shares, setShares] = useState('0');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const cancelRef = React.useRef(null);

  const isBuying = action === TransactionType.Buy;
  const buttonText = isBuying ? 'Acheter' : 'Vendre';

  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      const calculatedShares = parseFloat(amount) / etfData.currentPrice;
      setShares(calculatedShares.toFixed(6));
    } else {
      setShares('0');
    }
  }, [amount, etfData.currentPrice]);

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    console.log('Showing confirmation dialog');
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    console.log('Confirming transaction');
    const order: TransactionRequest = {
      etfId: etfData.etfID,
      userId: 'user-123',
      type: action,
      quantity: parseFloat(shares),
      price: etfData.currentPrice,
      estimatedFees: 0,
    };

    console.log('Submitting order:', order);
    onSubmit(order);
    setShowConfirmation(false);
  };

  const isSubmitDisabled = !amount || parseFloat(amount) <= 0 || isLoading;

  return (
    <VStack flex={1} justifyContent="space-between" p={6} safeArea>
      <Center flex={1}>
        <VStack space={6} alignItems="center" w="100%">
          <Text fontSize="lg" color="gray.600" textAlign="center">
            Montant à {isBuying ? 'investir' : 'retirer'}
          </Text>

          <HStack alignItems="center" space={2}>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0"
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                textAlign: 'center',
                width: screenWidth * 0.5,
                color: '#374151',
                padding: 8,
              }}
            />
            <Text fontSize="3xl" fontWeight="bold" color="gray.700">
              €
            </Text>
          </HStack>

          <Box bg="gray.50" p={4} rounded="lg" w="100%">
            <Text fontSize="md" color="gray.600" textAlign="center">
              Équivalent: {shares} parts
            </Text>
          </Box>
        </VStack>
      </Center>

      <VStack space={3} w="100%">
        <Button
          variant="primary"
          onPress={handleSubmit}
          isLoading={isLoading}
          isDisabled={isSubmitDisabled}
          bg="blue.500"
          _pressed={{ bg: 'blue.600' }}
          size="lg"
          py={3}
        >
          {isLoading ? 'Traitement...' : buttonText}
        </Button>

        <Button variant="outline" onPress={onCancel} isDisabled={isLoading} size="lg" py={3}>
          Annuler
        </Button>
      </VStack>

      <AlertDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Confirmer la transaction</AlertDialog.Header>
          <AlertDialog.Body>
            Voulez-vous vraiment {isBuying ? 'acheter' : 'vendre'} {shares} parts de{' '}
            {etfData.ticker} pour {amount}€ ?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <NBButton.Group space={2}>
              <NBButton
                variant="outline"
                colorScheme="coolGray"
                onPress={() => setShowConfirmation(false)}
                ref={cancelRef}
              >
                Annuler
              </NBButton>
              <NBButton colorScheme="blue" onPress={handleConfirmSubmit}>
                Confirmer
              </NBButton>
            </NBButton.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </VStack>
  );
};
