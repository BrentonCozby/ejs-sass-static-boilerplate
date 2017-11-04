import webpack from 'webpack'
import { join } from 'path'
import * as config from './config'

export default {
    entry: {
        bundle: [`./${join('src', 'js', 'index.js')}`],
        common: [`./${join('src', 'js', 'common', 'index.js')}`],
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
    ],
}
