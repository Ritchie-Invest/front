module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['tamagui', 'react-native-reanimated/plugin'],
  };
};
