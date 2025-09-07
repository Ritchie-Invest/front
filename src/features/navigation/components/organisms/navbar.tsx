import React from 'react';
import { VStack, HStack, Text, Pressable } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainStackParamList } from '~/navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useActiveTab } from '~/features/navigation/hooks/useActiveTab';
import { TabName, TabNameType } from '~/features/navigation/Type/TabNames';
import { borderRadius, colors, paddings } from '~/lib/theme/theme';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface TabItemProps {
  name: TabNameType;
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
        color={isActive ? colors.primaryActionColor : '#9ca3af'}
        size={24}
      />
      <Text fontSize={12} color={isActive ? '$blue500' : '$gray400'}>
        {label}
      </Text>
    </VStack>
  </Pressable>
);

const Navbar: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const activeTab = useActiveTab();

  const handleLessonsPress = () => {
    navigation.navigate('Landing');
  };

  const handleInvestmentPress = () => {
    navigation.navigate('InvestmentDashboard');
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
        name={TabName.Landing}
        icon="menu-book"
        label="Leçons"
        onPress={handleLessonsPress}
        isActive={activeTab === TabName.Landing}
      />

      <TabItem
        name={TabName.InvestmentDashboard}
        icon="trending-up"
        label="Portfolio"
        onPress={handleInvestmentPress}
        isActive={activeTab === TabName.InvestmentDashboard}
      />
    </HStack>
  );
};

export default Navbar;
