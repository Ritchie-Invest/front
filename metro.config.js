const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.unstable_conditionNames = ['require', 'react-native', 'default'];
config.resolver.unstable_enablePackageExports = true;
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
if (!config.resolver.sourceExts.includes('svg')) {
	config.resolver.sourceExts.push('svg');
}
config.resolver.sourceExts.push('mjs');

module.exports = config;
