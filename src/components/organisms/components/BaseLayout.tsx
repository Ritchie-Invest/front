import { Box, SafeAreaView } from '@gluestack-ui/themed';
import useAuthGuard from '~/features/auth/hooks/useAuthGuard';
import Navbar from '~/features/navigation/components/organisms/navbar';
import { colors, paddings } from '~/lib/theme/theme';

export default function BaseLayout({
  children,
  showNavbar = true,
}: {
  children: React.ReactNode;
  showNavbar?: boolean;
}) {
  useAuthGuard();
  return (
    <SafeAreaView flex={1} backgroundColor={colors.mainBackgroundColor}>
      <Box flex={1} backgroundColor={colors.mainBackgroundColor} padding={paddings.paddingLarge}>
        {children}
      </Box>
      {showNavbar && <Navbar />}
    </SafeAreaView>
  );
}
