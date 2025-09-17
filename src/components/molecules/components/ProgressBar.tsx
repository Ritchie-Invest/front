import { Box } from '@gluestack-ui/themed';
import { Progress, ProgressFilledTrack } from '@gluestack-ui/themed';
import { colors, borderRadius } from '~/lib/theme/theme';

export type ProgressBarProps = {
  value: number;
};
export default function ProgressBar({ value }: ProgressBarProps) {
  if (value < 0 || value > 100) {
    console.error('Invalid progress value. It must be between 0 and 100.');
    return null;
  }

  return (
    <Box width="100%">
      <Progress
        value={value}
        bg={colors.GreyL30}
        height="$2"
        borderRadius={borderRadius.borderRadiusMedium}
      >
        <ProgressFilledTrack backgroundColor={colors.infoColor} />
      </Progress>
    </Box>
  );
}
