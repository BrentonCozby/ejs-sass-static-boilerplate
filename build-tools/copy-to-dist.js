import transformFiles from './transform-files.js'
import { resolve } from 'path'
import fs from 'fs'
import { Dir } from '../config.js'

function setEncoding(filename) {
    let encoding = 'utf-8'

    switch (true) {
        //image types
        case /\.jpeg$/.test(filename):
        case /\.jpg$/.test(filename):
        case /\.png$/.test(filename):
        case /\.svg$/.test(filename):
        case /\.gif$/.test(filename):
        case /\.bmp$/.test(filename):
        case /\.tiff$/.test(filename):

        // video types
        case /\.mp4$/.test(filename):
        case /\.webm$/.test(filename):
        case /\.wav$/.test(filename):

        // font types
        case /\.otf$/.test(filename):
        case /\.ttf$/.test(filename):
        case /\.fnt$/.test(filename):
        case /\.eot$/.test(filename):
        case /\.woff$/.test(filename):
        case /\.woff2$/.test(filename):
            encoding = null
    }

    return encoding
}

// Copy directories
function copyDir(filename, inputDir, outputDir) {
    const filePath = resolve(inputDir, filename)
    const newFilePath = resolve(outputDir, filename)

    fs.readFile(filePath, setEncoding(filename), (err, fileContents) => {
        if(err) return console.log(err)

        fs.writeFile(newFilePath, fileContents, err => {
            if(err) return console.log(err)
        })
    })
}

// will create dist if it doesn't already exist
transformFiles(
    resolve(Dir.static),
    { dest: resolve(Dir.dist) },
    copyDir
)
