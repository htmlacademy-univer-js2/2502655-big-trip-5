const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './src/main.js',
  output: {

    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,

    filename: 'bundle.[contenthash].js', // Имя файла сборки с хэшем

    filename: 'bundle.js', // Имя файла сборки
    path: path.resolve(__dirname, 'build'), // Директория для сборки
    clean: true, // Очистка директории перед новой сборкой

  },
  devtool: 'source-map',
  plugins: [
    new HtmlPlugin({
      template: 'public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {

          loader: 'babel-loader',

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
            presets: ['@babel/preset-env']
          },
        },
      },
      {

        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
    ],
  },

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

};