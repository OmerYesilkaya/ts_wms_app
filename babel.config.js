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
            '@app/html': './src/assets/html',
            '@app/animations': './src/assets/animations',
            '@app/images': './src/assets/images',
            '@app/locales': './src/assets/locales',
            '@app/api': './src/api',
            '@app/auth': './src/auth',
            '@app/components': './src/components',
            '@app/constants': './src/constants',
            '@app/screens': './src/screens',
            '@app/navigation': './src/navigation',
            '@app/hooks': './src/hooks',
            '@app/utility': './src/utility',
            '@app/types': './src/types',
            '@app/styles': './src/styles',
          },
        },
      ],
    ],
  };
};
