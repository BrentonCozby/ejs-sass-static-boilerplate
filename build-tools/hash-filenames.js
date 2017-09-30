import fs from 'fs'
import crypto from 'crypto'
import { resolve } from 'path'
import { Dir, DEV_PATH } from '../config.js'
import transformFiles from './transform-files.js'

const dirs = [
    resolve(Dir.dist, 'js'),
    resolve(Dir.dist, 'css')
]

let mapData = {}

function transformer({ filename, sourcePath, destinationPath }) {
    const oldFilePath = resolve(sourcePath, filename)

    const fileContents = fs.readFileSync(oldFilePath, 'utf-8')

    const hash = crypto.createHash('md5').update(fileContents).digest('hex')

    if(filename.indexOf(hash) !== -1) {
        console.log(`${filename} is unchanged.`)

        const str = filename.split('.')
        str.splice(str.indexOf(hash), 1)
        const baseFilename = str.join('.')

        mapData[baseFilename] = filename
        return false
    }

    const str = filename.split('')
    str.splice(filename.lastIndexOf('.'), 0, '.' + hash)
    const filenameHashed = str.join('')
    const newFilePath = resolve(destinationPath, filenameHashed)

    fs.renameSync(oldFilePath, newFilePath)

    mapData[filename] = filenameHashed

    console.log(`${filename} was renamed to ${filenameHashed}`)
}

function hashFilenames(directories) {
    if(!Dir.dist) return false

    console.log('Hashing filenames...\n')

    directories.forEach(dir => {
        transformFiles(dir, {}, transformer)
    })

    fs.writeFileSync(resolve(DEV_PATH, 'filename-map.json'), JSON.stringify(mapData), 'utf-8')

    console.log('\nFilenames hashed!\n')
}

hashFilenames(dirs)
