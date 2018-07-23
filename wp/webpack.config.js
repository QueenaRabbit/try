//nodejs
let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebapckPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    main2: './src/index2.js',
    main3: './src/index3.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  mode: 'development',
  module: {
    rules: [
      { 
        test: /\.css$/, 
        use: ExtractTextWebapckPlugin.extract({
          use: 'css-loader'
        }) 
      },
      {
        test: /\.js$/, exclude: /node_modules/, use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      },
      {
        test:/\.(png|jpg|gif)/,
        use:[{
          loader: 'url-loader',
          options: {
            limit: 5000,
            outputPath: 'images/', //5000意思存到images
          }
        }]
      }
    ]
  },
  devServer: {
    port: 8088,
    open: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.css', '.json', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',//默认到output目录
      hash: true,//防止缓存,会给文件后面加入hash
      minify: {
        removeAttributeQuotes: true//压缩 去掉引号
      }
    }),
    new ExtractTextWebapckPlugin('css/[name][hash:6].css'),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname,'public'), to: path.resolve(__dirname,'dist/static') }
    ])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        moda: {// 自定义
          test: /mod/,
          chunks: 'all',//有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
          name: 'chunks/moda',//拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；设置ture则使用默认值
          priority: 10//表示缓存的优先级
        },
        jquery: {
          test: /node_modules/,
          chunks: 'all',
          name: 'chunks/jquery',
          priority: 10
        }
      }
    }
  }
};