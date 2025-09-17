import React from 'react';
import { Center, Text } from '@gluestack-ui/themed';
import { Image } from 'react-native';
import { typography, colors } from '~/lib/theme/theme';
import { Screen } from '~/features/navigation/Type/Screen';

const imageSources = {
  [Screen.HOME]: require('~/assets/images/HOME.webp'),
  [Screen.DASHBOARD]: require('~/assets/images/DASHBOARD.webp'),
  [Screen.PORTFOLIO]: require('~/assets/images/PORTFOLIO.webp'),
  [Screen.ETF_DETAILS]: require('~/assets/images/ETF_DETAILS.webp'),
  [Screen.AUTH_REGISTER]: require('~/assets/images/AUTH_REGISTER.webp'),
  [Screen.AUTH_LOGIN]: require('~/assets/images/AUTH_LOGIN.webp'),
  [Screen.ONBOARDING]: require('~/assets/images/ONBOARDING.webp'),
  [Screen.PROFILE]: require('~/assets/images/PROFILE.webp'),
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
