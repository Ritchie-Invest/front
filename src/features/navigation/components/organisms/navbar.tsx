import React from 'react';
import { VStack, HStack, Text, Pressable } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainStackParamList } from '~/navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useActiveTab } from '~/features/navigation/hooks/useActiveTab';
import { borderRadius, colors, paddings, typography } from '~/lib/theme/theme';
import { Screen } from '../../Type/Screen';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface TabItemProps {
  name: Screen;
  icon: string;
  label: string;
  onPress: () => void;
  isActive: boolean;
}

const TabItem: React.FC<TabItemProps> = ({ icon, label, onPress, isActive }) => (
  <Pressable onPress={onPress}>
    <VStack alignItems="center">
      <MaterialIcons
        name={icon as any}
        color={isActive ? colors.primaryActionColor : colors.Grey}
        size={typography.heading1Size}
      />
      <Text fontSize={typography.captionSize} color={isActive ? '$blue500' : '$gray400'}>
        {label}
      </Text>
    </VStack>
  </Pressable>
);

const Navbar: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const activeTab = useActiveTab();

  const handleLessonsPress = () => {
    navigation.navigate(Screen.HOME as any);
  };

  const handleInvestmentPress = () => {
    navigation.navigate(Screen.DASHBOARD as any);
  };

  return (
    <HStack
      bg={colors.mainBackgroundColor}
      borderTopWidth={1}
      borderColor={colors.GreyL30}
      justifyContent="space-around"
      rounded={borderRadius.borderRadiusSmall}
      py={paddings.paddingSmall}
    >
      <TabItem
        name={Screen.HOME}
        icon="menu-book"
        label="Leçons"
        onPress={handleLessonsPress}
        isActive={[activeTab].includes(Screen.HOME || Screen.GAME)}
      />

      <TabItem
        name={Screen.DASHBOARD}
        icon="trending-up"
        label="Portfolio"
        onPress={handleInvestmentPress}
        isActive={[activeTab].includes(
          Screen.DASHBOARD || Screen.ETF_DETAILS || Screen.PORTFOLIO || Screen.TRANSACTION,
        )}
      />
    </HStack>
  );
};

export default Navbar;
