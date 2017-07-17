import transformFiles from './transform-files.js'
import { resolve } from 'path'
import fs from 'fs'
import { Dir } from './config.js'

function setEncoding(filename) {
    let encoding = 'utf-8'

    switch (true) {
        case filename.indexOf('.jpg') !== -1:
        case filename.indexOf('.jpeg') !== -1:
        case filename.indexOf('.png') !== -1:
        case filename.indexOf('.svg') !== -1:
        case filename.indexOf('.gif') !== -1:
        case filename.indexOf('.mp4') !== -1:
        case filename.indexOf('.webm') !== -1:
        case filename.indexOf('.wav') !== -1:
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

transformFiles(
    resolve(Dir.src, 'vendor'),
    { dest: resolve(Dir.dist, 'vendor') },
    copyDir
)
transformFiles(
    resolve(Dir.src, 'images'),
    { dest: resolve(Dir.dist, 'images') },
    copyDir
)

// Copy files
function copyFile(filename, inputDir, outputDir) {
    const filePath = resolve(inputDir, filename)
    const newFilePath = resolve(outputDir, filename)

    fs.readFile(filePath, setEncoding(filename), (err, fileContents) => {
        if(err) return console.log(err)

        fs.writeFile(newFilePath, fileContents, err => {
            if(err) return console.log(err)
        })
    })
}

copyFile('.htaccess', Dir.src, Dir.dist)
copyFile('humans.txt', Dir.src, Dir.dist)
copyFile('robots.txt', Dir.src, Dir.dist)
copyFile('sitemap.xml', Dir.src, Dir.dist)
