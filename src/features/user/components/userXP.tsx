import { Text } from '@gluestack-ui/themed';
import { colors, typography } from '~/lib/theme/theme';

interface UserXPProps {
  TotalXP: number;
  level: number;
}

const UserXP: React.FC<UserXPProps> = ({ TotalXP, level }) => {
  return (
    <>
      <Text
        fontSize={typography.bodySmallSize}
        fontWeight={typography.fontWeightMedium}
        color={colors.warningColor}
      >
        {TotalXP} XP ⚡- Niveau {level}
      </Text>
    </>
  );
};

export default UserXP;
