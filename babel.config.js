module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@app/assets': './src/assets',
            '@app/images': './src/assets/images',
            '@app/locales': './src/assets/locales',
            '@app/components': './src/components',
            '@app/constants': './src/constants',
            '@app/screens': './src/screens',
            '@app/navigation': './src/navigation',
            '@app/hooks': './src/hooks',
            '@app/lib': './src/lib',
            '@app/styles': './src/styles',
            '@app/types': './@types',
          },
        },
      ],
    ],
  };
};
