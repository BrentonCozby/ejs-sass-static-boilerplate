/* eslint-disable no-console */

import fs from 'fs'
import path from 'path'

let rootPath

const defaultOptions = {
    destination: null,
    flatten: false,
}

export function createDirsInPath(dirPath) {
    dirPath
        .split(path.sep)
        .reduce((prevPath, nextDir) => {
            if (!fs.existsSync(path.resolve(prevPath, nextDir))) {
                fs.mkdirSync(path.resolve(prevPath, nextDir))
            }
            return path.resolve(prevPath, nextDir)
        }, path.sep)
}

function transformFiles(sourcePath, options = defaultOptions, fileTransformer) {
    // validate params
    if (!path.isAbsolute(sourcePath)) {
        throw Error('sourcePath argument must be an absolute path.\n')
    }

    if (options.destination && !path.isAbsolute(options.destination)) {
        throw Error('options.desintation must be an absolute path.\n')
    }

    if (options.flatten && typeof options.flatten !== 'boolean') {
        throw TypeError('options.flatten must be a boolean value.\n')
    }

    Object.keys(options).forEach((optionName) => {
        if (optionName in defaultOptions === false) {
            throw Error(`'${optionName}' is not a valid option.\n`)
        }
    })
    // end validate params

    if (!rootPath) rootPath = sourcePath

    function setDestinationPath(source) {
        let destPath = source

        if (options.destination) {
            if (options.flatten) {
                destPath = options.destination
            } else {
                const relativePathFromRootPath = source.replace(rootPath, '').slice(1) // first char is '/'
                destPath = path.resolve(options.destination, relativePathFromRootPath)
            }
        }

        return destPath
    }

    function isDir(pathToFileOrDir) {
        return fs.statSync(pathToFileOrDir).isDirectory()
    }

    function transformOneFile(filename, destinationPath) {
        createDirsInPath(destinationPath)

        fileTransformer({
            filename,
            sourcePath,
            destinationPath,
        })
    }

    fs.readdirSync(sourcePath).forEach((fileOrDirName) => {
        const fileOrDirPath = path.resolve(sourcePath, fileOrDirName)
        const destinationPath = setDestinationPath(sourcePath)

        if (isDir(fileOrDirPath)) {
            transformFiles(fileOrDirPath, options, fileTransformer)
        } else {
            transformOneFile(fileOrDirName, destinationPath)
        }
    })
}

export default transformFiles
