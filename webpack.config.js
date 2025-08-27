const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.web.simple.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              ['@babel/plugin-transform-runtime', { regenerator: true }]
            ]
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native/Libraries/Components/View': 'react-native-web/dist/exports/View',
      'react-native/Libraries/Components/Text': 'react-native-web/dist/exports/Text',
      'react-native/Libraries/Components/Image': 'react-native-web/dist/exports/Image',
      'react-native/Libraries/Components/TouchableOpacity': 'react-native-web/dist/exports/TouchableOpacity',
      'react-native/Libraries/Components/ScrollView': 'react-native-web/dist/exports/ScrollView',
      'react-native/Libraries/Components/TextInput': 'react-native-web/dist/exports/TextInput',
      'react-native/Libraries/Components/Alert': 'react-native-web/dist/exports/Alert',
      'react-native/Libraries/Components/Dimensions': 'react-native-web/dist/exports/Dimensions',
      'react-native/Libraries/Components/StatusBar': 'react-native-web/dist/exports/StatusBar',
      'react-native/Libraries/Components/SafeAreaView': 'react-native-web/dist/exports/SafeAreaView',
      'react-native/Libraries/Components/Platform': 'react-native-web/dist/exports/Platform',
    },
    fallback: {
      "fs": false,
      "path": false,
      "crypto": false,
      "stream": false,
      "os": false,
      "url": false,
      "zlib": false,
      "http": false,
      "https": false,
      "assert": false,
      "constants": false,
      "buffer": false,
      "process": require.resolve("process/browser"),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3002,
    hot: true,
    historyApiFallback: true,
    open: true,
  },
}; 