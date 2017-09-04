import fs from 'fs'
import { resolve } from 'path'
import { Dir } from '../config.js'
import transformFiles from './transform-files.js'
import CleanCss from 'clean-css'

transformFiles(resolve(Dir.dist, 'css'), {}, ({ filename, sourcePath, destinationPath }) => {
    const filePath = resolve(sourcePath, filename)
    const minified = new CleanCss({ rebase: false }).minify([filePath])

    fs.writeFile(resolve(destinationPath, filename), minified.styles, err => {
        if(err) return console.log(err)

        const efficiency = Math.round (Number(minified.stats.efficiency) * 100 )
        console.log('\x1b[1m%s\x1b[0m', `${efficiency}%`, `smaller: ${filePath}`);
    })
})
