const path = require('path')
const config = require('./config')
const webpack = require('webpack')

let isProduction

module.exports = (env = {}) => {

    isProduction = env.production === true

    return {
        entry: {
            vendor: ['lodash.throttle', 'sanitize-html'],
            bundle: ['./src/js/index.js'],
        },
        output: {
            filename: 'js/[name].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: config.PP,
        },
        module: {
            parser: {
                system: true
            },
            rules: [
                {
                    test: /\.js$/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['env', { modules: false }],
                                'stage-0',
                            ]
                        }
                    }]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                NODE_ENV: isProduction ? 'production' : 'development',
                PP: '',
                SITE_TITLE: config.SITE_TITLE,
                DESCRIPTION: config.DESCRIPTION,
                SITE_URL: config.SITE_URL,
                DEVELOPER_NAME: config.DEVELOPER_NAME,
                DEVELOPER_URL: config.DEVELOPER_URL,
                GOOGLE_ANALYTICS_ID: config.GOOGLE_ANALYTICS_ID
            })
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all'
                    }
                }
            }
        },
        resolve: {
            alias: {
                dist: config.Dir.dist,
                src: config.Dir.src,
                css: config.Dir.css,
                js: config.Dir.js,
                static: config.Dir.static,
                images: config.Dir.images,
                videos: config.Dir.images,
                vendor: config.Dir.vendor,
                views: config.Dir.views,
                pages: config.Dir.pages,
                partials: config.Dir.partials,
            },
        },
        devtool: isProduction ? '' : 'source-map',
    }
}
