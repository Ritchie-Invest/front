import React from 'react';
import { Center, Text } from '@gluestack-ui/themed';
import { Image } from 'react-native';
import { typography, colors } from '~/lib/theme/theme';
import { Screens } from '~/features/navigation/Type/Screens';

const imageSources = {
  [Screens.HOME]: require('~/assets/images/HOME.webp'),
  [Screens.DASHBOARD]: require('~/assets/images/DASHBOARD.webp'),
  [Screens.PORTFOLIO]: require('~/assets/images/PORTFOLIO.webp'),
  [Screens.ETF_DETAILS]: require('~/assets/images/ETF_DETAILS.webp'),
  [Screens.AUTH_REGISTER]: require('~/assets/images/AUTH_REGISTER.webp'),
  [Screens.AUTH_LOGIN]: require('~/assets/images/AUTH_LOGIN.webp'),
  [Screens.ONBOARDING]: require('~/assets/images/ONBOARDING.webp'),
  [Screens.PROFILE]: require('~/assets/images/PROFILE.webp'),
} as const;

type PageCoverScreen = keyof typeof imageSources;

type PageCoverProps = {
  Screen: PageCoverScreen;
  title: string;
  size: number;
};

export default function PageCover({ Screen, title, size }: PageCoverProps) {
  const imageSource = imageSources[Screen];
  return (
    <Center alignItems="center" width="100%">
      <Image
        source={imageSource}
        style={{
          width: size,
          height: size,
          alignSelf: 'center',
        }}
      />
      <Text
        fontSize={typography.heading1Size}
        color={colors.primaryActionActiveColor}
        fontWeight={typography.fontWeightBold}
        textAlign="center"
      >
        {title}
      </Text>
    </Center>
  );
}
