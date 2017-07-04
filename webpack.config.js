let path = require('path')
  , webpack = require('webpack')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , BrowserSyncPlugin = require('browser-sync-webpack-plugin')

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
}
