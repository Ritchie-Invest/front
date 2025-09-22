import { config as defaultConfig } from '@gluestack-ui/config';
import { createConfig } from '@gluestack-style/react';
import { colors } from './values/color';
import { typography } from './values/typography';
import { paddings } from './values/padding';
import { margins } from './values/margin';
import { borderRadius } from './values/border-radius';
import { spacing } from './values/spacing';
import { iconSizes } from './values/iconSizes';

export const customConfig = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      ...colors,
    },
    fontSizes: {
      ...defaultConfig.tokens.fontSizes,
      ...typography,
    },
    paddings: {
      ...paddings,
    },
    margins: {
      ...margins,
    },
    borderRadius: {
      ...borderRadius,
    },
    spacing: {
      ...spacing,
    },
  },
});

export { colors, typography, paddings, margins, borderRadius, spacing, iconSizes };

export type CustomConfigType = typeof customConfig;
