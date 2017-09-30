import fs from 'fs'
import { resolve } from 'path'
import transformFiles from './transform-files.js'
import {
    SITE_TITLE,
    DESCRIPTION,
    SITE_URL,
    DEVELOPER_NAME,
    DEVELOPER_URL,
    Dir
} from '../config.js'

function transformer({filename, sourcePath}) {
    const filePath = resolve(sourcePath, filename)
    let fileContents = fs.readFileSync(filePath, 'utf-8')

    fileContents = '/*!\n' +
        `* ${SITE_TITLE}\n` +
        `* ${DESCRIPTION}\n` +
        `* ${SITE_URL}\n` +
        `* @author ${DEVELOPER_NAME} -- ${DEVELOPER_URL}\n` +
        `* Copyright ${(new Date).getFullYear()}. MIT Licensed.\n` +
        '*/\n\n'  + fileContents

    fs.writeFile(filePath, fileContents, err => {
        if(err) return console.log(err)
    })
}

// transform only the pages, not the partials
transformFiles(resolve(Dir.dist, 'js'), {}, transformer)
transformFiles(resolve(Dir.dist, 'css'), {}, transformer)
