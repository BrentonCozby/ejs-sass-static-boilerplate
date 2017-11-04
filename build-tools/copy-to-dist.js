import { resolve } from 'path'
import fs from 'fs'

import transformFiles from './transform-files'
import { Dir } from '../config'

function setEncoding(filename) {
    let encoding = 'utf-8'

    switch (true) {
        // image types
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

        default:
    }

    return encoding
}

function copyDir({ filename, sourcePath, destinationPath }) {
    const filePath = resolve(sourcePath, filename)
    const newFilePath = resolve(destinationPath, filename)

    fs.readFile(filePath, setEncoding(filename), (readFileError, fileContents) => {
        if (readFileError) {
            throw Error(readFileError)
        }

        fs.writeFile(newFilePath, fileContents, (writeFileError) => {
            if (writeFileError) {
                throw Error(writeFileError)
            }
        })
    })
}

transformFiles(
    Dir.static,
    { destination: Dir.dist },
    copyDir,
)
