const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.unstable_conditionNames = ['require', 'react-native', 'default'];
config.resolver.unstable_enablePackageExports = true;
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
if (!config.resolver.sourceExts.includes('svg')) {
	config.resolver.sourceExts.push('svg');
}
config.resolver.sourceExts.push('mjs');
// Ensure Metro treats .lottie files as assets so require('*.lottie') resolves
if (!config.resolver.assetExts) {
	config.resolver.assetExts = [];
}
if (!config.resolver.assetExts.includes('lottie')) {
	config.resolver.assetExts.push('lottie');
}

module.exports = config;
