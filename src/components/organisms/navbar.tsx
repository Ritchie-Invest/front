import { VStack, HStack, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; // Assurez-vous d'importer correctement MaterialIcons

const Navbar = () => (
  <HStack bg="white" borderTopWidth={1} borderColor="gray.200" justifyContent="space-around" py={2}>
    <VStack alignItems="center">
      <MaterialIcons name="menu-book" color="#3b82f6" size={24} />
      <Text fontSize="xs" color="blue.500">
        Leçons
      </Text>
    </VStack>
    <VStack alignItems="center">
      <MaterialIcons name="bar-chart" color="#9ca3af" size={24} />
      <Text fontSize="xs" color="gray.400">
        Progrès
      </Text>
    </VStack>
    <VStack alignItems="center">
      <MaterialIcons name="person" color="#9ca3af" size={24} />
      <Text fontSize="xs" color="gray.400">
        Profil
      </Text>
    </VStack>
  </HStack>
);

export default Navbar;
