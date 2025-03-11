const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js', // Точка входа
  output: {
    filename: 'bundle.[contenthash].js', // Имя файла сборки с хэшем
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
        },
      },
      {
        test: /\.css$/, // Обрабатываем только .css файлы
        use: ['style-loader', 'css-loader'], // Используем style-loader и css-loader
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Указываем шаблон HTML
      filename: 'index.html', // Имя выходного файла
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: '',
          globOptions: {
            ignore: ['**/index.html'], // Игнорируем index.html
          },
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'), // Директория для dev-server
    },
    compress: true, // Сжатие файлов
    port: 9000, // Порт для dev-server
    open: true, // Автоматически открывать браузер
  },

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