import webpack from 'webpack'
import { join, sep } from 'path'
require('dotenv').config()

import { Dir, rootRelPath } from './config.js'

export default {
    entry: `.${sep}` + join('src', 'js', 'index.js'),
    output: {
        filename: `.${sep}` + join('dist', 'js', 'bundle.js'),
        publicPath: rootRelPath + sep
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
    }
}
