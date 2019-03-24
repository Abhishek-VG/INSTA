const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // Base path for the project
  context: path.resolve('src'),
  // mode
  mode: 'production',
  // entry of the project
  entry: {
    main: './index.tsx'
  },
  // output
  output: {
    path: path.resolve('build'),
    filename: '[chunkhash].js'
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
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: true,
          chunks: 'all'
        }
      }
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
    // helps in keeping vendor libraries name unaffected
    new webpack.NamedModulesPlugin(),
    // copies static files
    new CopyWebpackPlugin([{ from: 'public/favicon.png', to: 'build' }]),
    // for module size analyzing
    new BundleAnalyzerPlugin()
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
