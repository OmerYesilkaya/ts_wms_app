module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@app/api': './src/api',
            '@app/assets': './src/assets',
            '@app/html': './src/assets/html',
            '@app/animations': './src/assets/animations',
            '@app/images': './src/assets/images',
            '@app/locales': './src/assets/locales',
            '@app/components': './src/components',
            '@app/constants': './src/constants',
            '@app/screens': './src/screens',
            '@app/navigation': './src/navigation',
            '@app/hooks': './src/hooks',
            '@app/lib': './src/lib',
            '@app/types': './src/types',
            '@app/styles': './src/styles',
          },
        },
      ],
    ],
  };
};
