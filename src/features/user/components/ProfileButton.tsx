import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '~/features/navigation/Type/Screens';
import { borderRadius, colors, paddings } from '~/lib/theme/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { Center } from '@gluestack-ui/themed';

export const ProfileButton: React.FC = () => {
  const navigation = useNavigation();
  let isActive = false;
  const handlePress = () => {
    isActive = true;
    (navigation as any).navigate(Screens.PROFILE);
  };

  return (
    <Center
      borderWidth={1}
      borderColor={colors.infoBackgroundColor}
      backgroundColor={isActive ? colors.infoBackgroundColor : undefined}
      borderRadius={borderRadius.borderRadiusLarge}
      padding={paddings.paddingVerySmall}
    >
      <TouchableOpacity onPress={handlePress} accessibilityLabel="profile-button">
        <MaterialIcons
          name="person"
          size={32}
          color={isActive ? colors.infoColor : colors.infoInactiveColor}
        />
      </TouchableOpacity>
    </Center>
  );
};
