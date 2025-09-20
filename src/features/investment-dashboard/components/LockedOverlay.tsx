import { Box, Center, Text } from '@gluestack-ui/themed';
import { Image, Dimensions } from 'react-native';
import { borderRadius, colors, paddings, spacing, typography } from '~/lib/theme/theme';

type LockedOverlayProps = {
  level?: number;
};

const LockedOverlay: React.FC<LockedOverlayProps> = ({ level }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <Center
      flex={1}
      backgroundColor={colors.infoBackgroundColor}
      padding={paddings.paddingLarge}
      style={{ gap: spacing.spacingMedium }}
      borderRadius={borderRadius.borderRadiusMedium}
    >
      <Text
        textAlign="center"
        fontWeight={typography.fontWeightBold}
        color={colors.infoColor}
        size={typography.heading1SizeFallback}
      >
        Vous n'avez pas encore débloqué le dashboard d'investissement&nbsp;!
      </Text>
      <Image
        source={require('~/assets/images/LOCKED.webp')}
        alt="Locked"
        width={screenWidth * 0.5}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
        }}
      />
      <Text
        textAlign="center"
        fontWeight={typography.fontWeightMedium}
        color={colors.infoColor}
        size={typography.heading3SizeFallback}
      >
        Veuillez atteindre le niveau {level} pour le débloquer
      </Text>
    </Center>
  );
};

export default LockedOverlay;
