import { resolve } from 'path'
import fs from 'fs'
import {
    Dir,
    rootRelPath,
    siteTitle,
    siteUrl,
    description
} from './config.js'
import transformFiles from './transform-files.js'
import ejs from 'ejs'
require('dotenv').config()

function transformer(filename, inputDir, outputDir) {
    const filePath = resolve(inputDir, filename)
    const ejsTemplate = fs.readFileSync(filePath, 'utf-8')
    const html = ejs.render(ejsTemplate, {
            filename: filePath,
            partials: Dir.partials,
            rootRelPath,
            siteTitle,
            siteUrl,
            description,
            delimiter: '%'
        })
    const filenamePlain = filename.split('.ejs')[0]
    const newFilePath = resolve(outputDir, `${filenamePlain}.html`)

    fs.writeFile(newFilePath, html, err => {
        if(err) return console.log(err)
    })
}

// transform only the pages, not the partials
transformFiles(Dir.pages, { dest: Dir.dist }, transformer)


// watch ejs changes
const args = process.argv

for(let i = 0; i < args.length; i++) {
    if(args[i] === '--watch') {
        // watch the entire views folder, including pages and partials
        fs.watch(Dir.views, { recursive: true }, function() {
            transformFiles(Dir.pages, { dest: Dir.dist }, transformer)
            console.log('Compiled EJS to HTML');
        })
        break;
    }
}
