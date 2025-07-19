import React from 'react';
import { VStack, HStack, Text, Pressable } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainStackParamList } from '../../navigation/MainNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useActiveTab, TabName } from '../../navigation/hooks';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface TabItemProps {
  name: TabName;
  icon: string;
  label: string;
  onPress: () => void;
  isActive: boolean;
}

const TabItem: React.FC<TabItemProps> = ({ icon, label, onPress, isActive }) => (
  <Pressable onPress={onPress}>
    <VStack alignItems="center">
      <MaterialIcons name={icon as any} color={isActive ? '#3b82f6' : '#9ca3af'} size={24} />
      <Text fontSize="xs" color={isActive ? 'blue.500' : 'gray.400'}>
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

  const handleProgressPress = () => {
    // TODO: Implement progress screen
    console.log('Progress pressed');
  };

  const handleProfilePress = () => {
    // TODO: Implement profile screen
    console.log('Profile pressed');
  };

  return (
    <HStack
      bg="white"
      borderTopWidth={1}
      borderColor="gray.200"
      justifyContent="space-around"
      py={2}
    >
      <TabItem
        name="Landing"
        icon="menu-book"
        label="Leçons"
        onPress={handleLessonsPress}
        isActive={activeTab === 'Landing'}
      />

      <TabItem
        name="InvestmentDashboard"
        icon="trending-up"
        label="Portfolio"
        onPress={handleInvestmentPress}
        isActive={activeTab === 'InvestmentDashboard'}
      />

      <TabItem
        name="Progress"
        icon="bar-chart"
        label="Progrès"
        onPress={handleProgressPress}
        isActive={activeTab === 'Progress'}
      />

      <TabItem
        name="Profile"
        icon="person"
        label="Profil"
        onPress={handleProfilePress}
        isActive={activeTab === 'Profile'}
      />
    </HStack>
  );
};

export default Navbar;
