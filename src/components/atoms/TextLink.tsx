import { Text, Pressable } from 'native-base';

type TextLinkProps = {
  onPress: () => void;
  children: React.ReactNode;
};

export const TextLink = ({ onPress, children }: TextLinkProps) => {
  return (
    <Pressable onPress={onPress} px={2} py={2}>
      {({ isPressed }) => (
        <Text color="primary.500" underline fontSize="sm" opacity={isPressed ? 0.6 : 1}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};
