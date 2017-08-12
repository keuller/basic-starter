<<<<<<< HEAD
var path = require('path')
var webpack = require('webpack')
=======
let path = require('path')
  , webpack = require('webpack')
>>>>>>> 6af187b3b0c13ac3e80209324808dcb89ae6c3ce
  , ExtractTextPlugin = require('extract-text-webpack-plugin')

<<<<<<< HEAD
var cssLoader = ExtractTextPlugin.extract({
    use: 'css-loader'
})


module.exports = {
  entry:{
    bundle: './src/index.jsx',
    vendor: ['react', 'react-dom'],
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: cssLoader
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
    }
  },

  devServer: {
    historyApiFallback: true,
    port: '8000',
    noInfo: true
  },

  devtool: '#eval-source-map',

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
        'React': 'react' 
    }),
    new ExtractTextPlugin("app.css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      warnings: false
    })
  ]
=======
const addPath = (...args) => path.join(...args)

const env = process.env.NODE_ENV || 'dev'

const extractAPP = new ExtractTextPlugin('app.css')

const prodPlugins = [
    extractAPP,
    new webpack.DefinePlugin({
        'process.env':{
            'NODE_ENV': "'production'"
        }
    }),
    new webpack.ProvidePlugin({
        'React': 'react'
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
]

const devPlugins = [
    extractAPP,
    new webpack.ProvidePlugin({
        'React': 'react'
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: [__dirname] }
    }, { reload: true }),
    new webpack.NoEmitOnErrorsPlugin()
]

module.exports = {
    entry: {
        bundler: addPath(__dirname, 'src', 'index.jsx'),
        vendor: ['react', 'react-dom']
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },

    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.js', '.jsx']
    },

    node: {
        fs: 'empty'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'react-optimize'],
                    env: {
                        production: {
                            presets: ["react-optimize"]
                        }
                    }
                }
            }, {
                test: /\.css/,
                loader: extractAPP.extract(['css-loader']),
                exclude: /node_modules/
            }
        ]
    },

    plugins: (env === 'dev' ? devPlugins : prodPlugins)
>>>>>>> 6af187b3b0c13ac3e80209324808dcb89ae6c3ce
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}