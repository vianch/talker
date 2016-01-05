var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    context: __dirname,
    entry: {
        app: "./app/boot",
        vendor: "./app/vendors"
    },

    output: {
        path: path.resolve('src'),
        publicPath: '/src',
        filename: "[name]-bundle.js",
        sourceMapFilename: '[name]-bundle.map',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new webpack.ProvidePlugin({
            "_": "lodash"
        }),
        new webpack.ContextReplacementPlugin(/buffer/, require('buffer')),

        new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor-bundle.js', minChunks: Infinity }),
        new CommonsChunkPlugin({ name: 'common', filename: 'common-bundle.js', minChunks: 2, chunks: ['app', 'vendor'] })
         // include uglify in production

    ],

    devServer: {
        contentBase: '/'
    },

    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "tslint-loader"
            }
        ],
        loaders: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "html"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"
            },
            {
                test: /\.(png|jpg|gif|woff|woff2)(\?.*$|$)/,
                exclude: /node_modules/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.(ttf|eot|svg)(\?.*$|$)/,
                exclude: /node_modules/,
                loader: "file"
            }
        ],
        noParse: [ /.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/ ]
    },

     tslint: {
      emitErrors: false,
      failOnHint: false
    },
    
  resolve: {
    extensions: ['','.ts','.js'],
    root: path.join(__dirname, 'src/') //public
  }

};
