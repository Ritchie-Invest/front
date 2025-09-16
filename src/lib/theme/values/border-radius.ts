const borderRadius = {
  borderRadiusVerySmall: 4,
  borderRadiusSmall: 8,
  borderRadiusMedium: 16,
  borderRadiusLarge: 24,
  borderRadiusLargeFallback: 'lg' as const,
  borderRadiusExtraLarge: 32,
  borderRadiusCircle: 9999,

  // Fallbacks pour Gluestack
  borderRadius2xl: '2xl' as const,
  borderRadius3xl: '3xl' as const,
  borderRadiusFull: '$full' as const,
};
export { borderRadius };
