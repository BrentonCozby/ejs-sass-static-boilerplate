import webpack from 'webpack'
import { join } from 'path'
import * as config from './config'

export default {
    entry: {
        vendor: ['lodash.throttle', 'sanitize-html'],
        bundle: [`./${join('src', 'js', 'index.js')}`],
    },
    output: {
        filename: `./${join('dist', 'js', '[name].js')}`,
        publicPath: config.PP,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', { modules: false }],
                            'stage-0',
                        ],
                    },
                }],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            PP: JSON.stringify(config.PP),
            SITE_TITLE: JSON.stringify(config.SITE_TITLE),
            SITE_NAME: JSON.stringify(config.SITE_NAME),
            DESCRIPTION: JSON.stringify(config.DESCRIPTION),
            SITE_URL: JSON.stringify(config.SITE_URL),
            SITE_IMAGE: JSON.stringify(config.SITE_IMAGE),
            DEVELOPER_NAME: JSON.stringify(config.DEVELOPER_NAME),
            DEVELOPER_URL: JSON.stringify(config.DEVELOPER_URL),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
    ],
    resolve: {
        modules: [
            config.Dir.src,
            'node_modules',
        ],
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
}
