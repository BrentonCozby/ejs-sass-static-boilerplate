/* eslint-disable no-console */

import fs from 'fs'
import path from 'path'

let rootPath = undefined

const defaultOptions = {
    destination: null,
    flatten: false
}

function transformFiles(sourcePath, options = defaultOptions, fileTransformer) {
    validateArgs()

    if (!rootPath) rootPath = sourcePath

    fs.readdirSync(sourcePath).forEach(fileOrDirName => {
        const fileOrDirPath = path.resolve(sourcePath, fileOrDirName)
        const destinationPath = setDestinationPath(sourcePath, options)

        if (isDir(fileOrDirPath)) {
            transformFiles(fileOrDirPath, options, fileTransformer)
        } else {
            transformOneFile(fileOrDirName, sourcePath, destinationPath, fileTransformer)
        }
    })

    function validateArgs() {
        if (!path.isAbsolute(sourcePath)) {
            throw new Error('sourcePath argument must be an absolute path.\n')
        }
        if (options.destination && !path.isAbsolute(options.destination)) {
            throw new Error('options.desintation must be an absolute path.\n')
        }
        if (options.flatten && typeof options.flatten !== 'boolean') {
            throw new TypeError('options.flatten must be a boolean value.\n')
        }
        for (let optionName in options) {
            if (optionName in defaultOptions === false) {
                throw new Error(`'${optionName}' is not a valid option.\n`)
            }
        }
    }
    
    function setDestinationPath(source, options) {
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

    function transformOneFile(filename, sourcePath, destinationPath, fileTransformer) {
        createDirsInPath(destinationPath)

        fileTransformer({
            filename,
            sourcePath,
            destinationPath
        })
    }
}

export function createDirsInPath(dirPath) {
    forEachDirInPath(createDirIfDoesntExist)

    function forEachDirInPath(pathReducer) {
        dirPath
            .split(path.sep)
            .reduce(pathReducer, path.sep)
    }

    function createDirIfDoesntExist(dirPath, nextDir) {
        if (!fs.existsSync(path.resolve(dirPath, nextDir))) {
            fs.mkdirSync(path.resolve(dirPath, nextDir))
        }
        return path.resolve(dirPath, nextDir)
    }
}

export default transformFiles
