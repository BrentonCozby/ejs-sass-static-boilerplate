import fs from 'fs'
import { resolve } from 'path'
import { Dir } from './config.js'
import transformFiles from './transform-files.js'
import { minify } from 'html-minifier'

transformFiles(resolve(Dir.dist), {}, (filename, inputDir, outputDir) => {
    const filePath = resolve(inputDir, filename)

    if(/\.html$/.test(filename) === false) return false

    fs.readFile(filePath, 'utf-8', (err, html) => {
        const minified = minify(html, {
            removeAttributeQuotes: true,
            caseSensitive: true,
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            conservativeCollapse: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeRedundantAttributes: true
        })

        fs.writeFile(resolve(outputDir, filename), minified, err => {
            if(err) return console.log(err)

            // console.log('\x1b[1m%s\x1b[0m', `${efficiency}%`, `smaller: ${filePath}`);
        })
    })


})
