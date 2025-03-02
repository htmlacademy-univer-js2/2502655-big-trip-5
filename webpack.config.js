const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js', // Точка входа
  output: {
    filename: 'bundle.js', // Имя файла сборки
    path: path.resolve(__dirname, 'build'), // Директория для сборки
    clean: true, // Очистка директории перед новой сборкой
  },
  devtool: 'source-map', // Генерация source-maps
  module: {
    rules: [
      {
        test: /\.js$/, // Обрабатываем только .js файлы
        exclude: /node_modules/, // Исключаем папку node_modules
        use: {
          loader: 'babel-loader', // Используем babel-loader
          options: {
            presets: ['@babel/preset-env'], // Используем preset-env
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: 'build' }, // Копирование файлов из /public в /build
      ],
    }),
  ],
};