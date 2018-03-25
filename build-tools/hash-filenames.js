/* eslint-disable no-console */

import fs from 'fs'
import crypto from 'crypto'
import { resolve } from 'path'
import { Dir } from '../globals'
import transformFiles from './transform-files'

const dirsToHash = [
    resolve(Dir.dist, 'css')
]

const mapData = {}

function transformer({ filename, sourcePath, destinationPath }) {
    const oldFilePath = resolve(sourcePath, filename)

    const fileContents = fs.readFileSync(oldFilePath, 'utf-8')

    const hash = crypto.createHash('md5').update(fileContents).digest('hex')

    if (filename.indexOf(hash) >= 0) {
        console.log(`${filename} is unchanged.`)

        const str = filename.split('.')
        str.splice(str.indexOf(hash), 1)
        const baseFilename = str.join('.')

        mapData[baseFilename] = filename

        return
    }

    const str = filename.split('')
    str.splice(filename.lastIndexOf('.'), 0, `.${hash}`)
    const filenameHashed = str.join('')
    const newFilePath = resolve(destinationPath, filenameHashed)

    fs.renameSync(oldFilePath, newFilePath)

    mapData[filename] = filenameHashed

    console.log(`${filename} was renamed to ${filenameHashed}`)
}

function hashFilenames(directories) {
    if (!Dir.dist) {
        return
    }

    console.log('Hashing filenames...\n')

    directories.forEach((dir) => {
        transformFiles(dir, {}, transformer)
    })

    console.log('\nFilenames hashed!\n')

    // add the javascript files (hashed by webpack)
    transformFiles(resolve(Dir.dist, 'js'), {}, ({ filename }) => {
        if (!filename.includes('app') && !filename.includes('vendor')) {
            return
        }

        const noHash = filename.split('.').reduce((acc, curr, index) => {
            if (index > 0 && ['js', 'map'].indexOf(curr) === -1) {
                return acc
            }

            acc.push(curr)

            return acc
        }, [])

        const baseFilename = noHash.join('.')

        mapData[baseFilename] = filename
    })

    fs.writeFileSync(resolve(Dir.dist, 'filename-map.json'), JSON.stringify(mapData), 'utf-8')

    console.log('Hashed filenames map created.\n')
}

hashFilenames(dirsToHash)
