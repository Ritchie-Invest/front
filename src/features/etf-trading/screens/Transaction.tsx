import React, { useState, useMemo } from 'react';
import { Box, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { TransactionServiceAdapter } from '../adapters/TransactionService';
import { SimpleTransactionForm } from '../components/SimpleTransactionForm';
import { ETFHeader } from '../components/ETFHeader';
import { TransactionRequest } from '../models/Request';
import { TransactionType } from '../types/Transaction';
import { TRADING_ACTION_CONFIG } from '../models/FormConfig';
import { ETFWithPriceHistory } from '../../etf-detail/model/etfPriceData';

interface ETFTradingScreenProps {
  etfID: number;
  action: TransactionType;
  etfData: ETFWithPriceHistory;
  dataService?: TransactionServiceAdapter;
}

export const ETFTradingScreen: React.FC<ETFTradingScreenProps> = ({
  action,
  etfData,
  dataService,
}) => {
  const navigation = useNavigation();
  const toast = useToast();

  const service = useMemo(() => dataService || new TransactionServiceAdapter(), [dataService]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const actionConfig = TRADING_ACTION_CONFIG[action];

  const handleFormSubmit = async (order: TransactionRequest) => {
    try {
      setIsSubmitting(true);
      const result = await service.submitTradingOrder(order);

      if (result.status === 'completed') {
        toast.show({
          title: 'Ordre exécuté',
          description: `Votre ${actionConfig.actionNoun} a été ${actionConfig.pastLabel} avec succès`,
        });

        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } else {
        toast.show({
          title: "Erreur d'exécution",
          description: "L'ordre n'a pas pu être exécuté. Veuillez réessayer.",
        });
      }
    } catch (error) {
      toast.show({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <Box flex={1} bg="gray.50">
      {/* Header avec nom ETF et prix */}
      <ETFHeader etfData={etfData} action={action} />

      {/* Formulaire simple */}
      <SimpleTransactionForm
        etfData={etfData}
        action={action}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
        isLoading={isSubmitting}
      />
    </Box>
  );
};
