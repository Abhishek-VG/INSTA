const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // Base path for the project
  context: path.resolve('src'),
  // mode
  mode: 'development',
  // source map
  devtool: 'eval-source-map',
  // entry of the project
  entry: {
    main: './index.tsx'
  },
  // output
  output: {
    path: path.resolve('build'),
    filename: '[name].[hash].js'
  },
  // module resolvers
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|gif|svg|png)/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 50000
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  // extension resolvers
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  // plugins
  plugins: [
    // copies the template and injects the project
    new HtmlWebpackPlugin({ template: path.resolve('public/index.html') }),
    // copies static files
    new CopyWebpackPlugin([{ from: 'public/favicon.png', to: 'build' }]),
    // helps in keeping vendor libraries name unaffected
    new webpack.NamedModulesPlugin()
  ],
  // devserver
  devServer: {
    port: 1234,
    open: true,
    noInfo: false,
    // hotOnly: true,
    hot: true
  }
};
