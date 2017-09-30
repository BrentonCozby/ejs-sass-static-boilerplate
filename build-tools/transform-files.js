import fs from 'fs'
import path from 'path'

let rootPath = undefined

const defaultOptions = {
    destination: null,
    flatten: false
}

export default function transformFiles(
    sourcePath = '',
    options = defaultOptions,
    fileTransformer = function() {}
) {
    validateArgs()

    if (!rootPath) rootPath = sourcePath

    const dirContents = fs.readdirSync(sourcePath)

    dirContents.forEach(fileOrDirName => {
        const fileOrDirPath = path.resolve(sourcePath, fileOrDirName)
        const destinationPath = setDestinationPath(sourcePath, options)

        if (isDir(fileOrDirPath)) {
            transformFiles(fileOrDirPath, options, fileTransformer)
        } else {
            transformThisFile(fileOrDirName, sourcePath, destinationPath, fileTransformer)
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

    function transformThisFile(filename, sourcePath, destinationPath, fileTransformer) {
        createDirsInPath(destinationPath)

        fileTransformer({
            filename,
            sourcePath,
            destinationPath
        })
    }

    function isDir(pathToFileOrDir) {
        return fs.statSync(pathToFileOrDir).isDirectory()
    }

    function setDestinationPath(source, {destination, flatten}) {
        let destPath = source
        if (destination) {
            if (flatten) {
                destPath = options.destination
            } else {
                const relativePathFromRootPath = source.replace(rootPath, '').slice(1)
                destPath = path.resolve(options.destination, relativePathFromRootPath)
            }
        }
        return destPath
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
