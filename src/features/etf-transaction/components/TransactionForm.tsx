import React from 'react';
import { Box, VStack, HStack, Text, KeyboardAvoidingView } from '@gluestack-ui/themed';
import { useTransactionForm } from '../hooks/useTransaction';
import { InputField } from '~/components/atoms/InputField';
import { Button } from '~/components/atoms/Button';
import { ResponseMessage } from './ResponseMessage';
import { colors, spacing } from '~/lib/theme/theme';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const TransactionForm: React.FC = () => {
  const {
    amount,
    setAmount,
    handleSubmit,
    buttonText,
    finalVariant,
    selectedETF,
    loading,
    error,
    response,
  } = useTransactionForm();

  if (!selectedETF) {
    return (
      <Box mt="$6">
        <Text color={colors.errorColor} textAlign="center">
          Aucun ETF sélectionné
        </Text>
      </Box>
    );
  } else {
    return (
      <>
        {response ? (
          <ResponseMessage response={response} error={error} />
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
          >
            <ScrollView
              keyboardShouldPersistTaps="always"
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <VStack space={spacing.spacingLargeFallback} mt="$6">
                <HStack
                  alignItems="center"
                  justifyContent="center"
                  space={spacing.spacingMediumFallback}
                >
                  <Box>
                    <InputField
                      placeholder="0"
                      value={amount ?? ''}
                      onChange={setAmount}
                      variant="underlined"
                      type="numeric"
                      accessibilityLabel="Montant en euros"
                    />
                  </Box>
                  <Text fontSize={40} fontWeight="bold" color="black">
                    €
                  </Text>
                </HStack>
                <Button onPress={handleSubmit} variant={finalVariant} isLoading={loading}>
                  {buttonText}
                </Button>
                <ResponseMessage response={response} error={error} />
              </VStack>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </>
    );
  }
};
