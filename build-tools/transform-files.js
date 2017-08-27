import fs from 'fs'
import { resolve, sep } from 'path'

function createDir(dirPath) {
    dirPath.split(sep).reduce((path, dir) => {
        if (!fs.existsSync(resolve(path, dir))) {
            fs.mkdirSync(resolve(path, dir))
        }

        return resolve(path, dir)
    }, sep)
}

function findFiles(rootDir, directory, options, transformer) {
    const results = fs.readdirSync(directory)

    results.forEach(item => {
        const itemPath = resolve(directory, item)
        const stats = fs.statSync(itemPath)

        if(stats.isDirectory()) {
            findFiles(rootDir, itemPath, options, transformer)
        }
        else {
            let outputDir = directory
            if(options.dest) {
                if(options.flatten) {
                    outputDir = options.dest
                }
                else {
                    // need to slice(1) to remove the / from front of path
                    // so that resolve will work properly (can't resolve
                    // two absolute paths)
                    const path = directory.replace(rootDir, '').slice(1)
                    outputDir = resolve(options.dest, path)
                }
            }

            // need create each dir in the outputDir because you can't
            // write to it if it doesn't exist
            createDir(outputDir)

                 // filename, inputDir, outputDir
            transformer(item, directory, outputDir)
        }
    })
}

/*
    directory parameter must be an absolute path

    options: {
        dest: absolute path to write files to,
        flatten: boolean. don't preserve folder structure
    }
*/
function transformFiles(directory, options = {}, transformer) {
    const rootDir = directory

    findFiles(rootDir, directory, options, transformer)
}

export default transformFiles
