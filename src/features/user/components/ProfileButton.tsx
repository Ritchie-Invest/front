import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from '~/features/navigation/Type/Screen';
import { borderRadius, colors, paddings, iconSizes } from '~/lib/theme/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { Center } from '@gluestack-ui/themed';

export const ProfileButton: React.FC = () => {
  const navigation = useNavigation();
  let isActive = false;
  const handlePress = () => {
    isActive = true;
    (navigation as any).navigate(Screen.PROFILE);
  };

  return (
    <Center
      borderWidth={1}
      borderColor={colors.infoBackgroundColor}
      backgroundColor={isActive ? colors.infoBackgroundColor : undefined}
      borderRadius={borderRadius.borderRadiusLarge}
      padding={paddings.paddingVerySmall}
      width={30}
      height={30}
    >
      <TouchableOpacity
        onPress={handlePress}
        accessibilityLabel="profile-button"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <MaterialIcons
          name="person"
          size={iconSizes.iconMedium}
          color={isActive ? colors.infoColor : colors.infoInactiveColor}
        />
      </TouchableOpacity>
    </Center>
  );
};
