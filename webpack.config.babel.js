import webpack from 'webpack'
import { join, sep } from 'path'
require('dotenv').config()

import * as config from './config.js'

export default {
    entry: {
        bundle: [`.${sep}` + join('src', 'js', 'index.js')],
        vendor: [`.${sep}` + join('src', 'js', 'vendor.js')]
    },
    output: {
        filename: `.${sep}` + join('dist', 'js', '[name].js'),
        publicPath: config.PUBLIC_PATH
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
                            ['env', {modules: false}],
                            'stage-0'
                        ]
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            PUBLIC_PATH: JSON.stringify(config.PUBLIC_PATH),
            SITE_TITLE: JSON.stringify(config.SITE_TITLE),
            SITE_NAME: JSON.stringify(config.SITE_NAME),
            DESCRIPTION: JSON.stringify(config.DESCRIPTION),
            SITE_URL: JSON.stringify(config.SITE_URL),
            DEVELOPER_NAME: JSON.stringify(config.DEVELOPER_NAME),
            DEVELOPER_URL: JSON.stringify(config.DEVELOPER_URL)
        })
    ]
}
