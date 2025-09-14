import { Box } from '@gluestack-ui/themed';
import { ProfileButton } from './ProfileButton';
import UserXP from './userXP';
import { paddings } from '~/lib/theme/theme';
import { useUserInfos } from '../hooks/useUserInfos';

export default function UserHeader() {
  const { userInfos } = useUserInfos();

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      padding={paddings.paddingSmall}
    >
      <UserXP TotalXP={userInfos?.totalXp || 0} level={userInfos?.level || 0} />
      <ProfileButton />
    </Box>
  );
}
