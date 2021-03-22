const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
  mode:'development',//배포할 때는 product
  devtool: 'inline-source-map',
  //'eval'build 하는 속도가 빨라짐
  devServer: {
    contentBase: './dist',
  },
  resolve:{
    extensions: ['.js','.vue'],
  },
  entry:{
    app:path.join(__dirname,'main'),
  },
  module:{
    rules:[
      {
        test:/\.vue$/,
        use:'vue-loader'
      },
      {
        test:/\.css$/,
        use:['vue-style-loader','css-loader']
      },
      {
        test:/\.scss$/,
        use:['vue-style-loader','css-loader','sass-loader']
      }
    ],
  },
  plugins:[
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    }),
  ],
  output:{
    filename:'[name].js',
    path:path.join(__dirname,'dist'),
    publicPath:'/dist',
  },
}