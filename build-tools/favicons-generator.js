import favicons from 'favicons'
import { resolve, join, sep } from 'path'
import {
    Dir,
    SITE_TITLE,
    DESCRIPTION,
    PUBLIC_PATH,
    DEVELOPER_NAME,
    DEVELOPER_URL
} from '../config.js'
import fs from 'fs'

const source = resolve(Dir.images, 'b-icon.png')

const config = {
    appName: SITE_TITLE,                  // Your application's name. `string`
    appDescription: DESCRIPTION,           // Your application's description. `string`
    developerName: DEVELOPER_NAME,            // Your (or your developer's) name. `string`
    developerURL: DEVELOPER_URL,             // Your (or your developer's) URL. `string`
    background: "#111",             // Background colour for flattened icons. `string`
    theme_color: "#111",            // Theme color for browser chrome. `string`
    path: join(PUBLIC_PATH, 'images', 'favicons'),                      // Path for overriding default icons path. `string`
    display: "standalone",          // Android display: "browser" or "standalone". `string`
    orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string`
    start_url: "/?homescreen=1",    // Android start application's URL. `string`
    version: "1.0",                 // Your application's version number. `number`
    logging: false,                 // Print logs to console? `boolean`
    online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
    preferOnline: false,            // Use offline generation, if online generation has failed. `boolean`
    icons: {
        // Platform Options:
        // - offset - offset in percentage
        // - shadow - drop shadow for Android icons, available online only
        // - background:
        //   * false - use default
        //   * true - force use default, e.g. set background for Android icons
        //   * color - set background for the specified icons
        //
        android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }`
        appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background }`
        appleStartup: true,         // Create Apple startup images. `boolean` or `{ offset, background }`
        coast: { offset: 25 },      // Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }`
        favicons: true,             // Create regular favicons. `boolean`
        firefox: true,              // Create Firefox OS icons. `boolean` or `{ offset, background }`
        windows: true,              // Create Windows 8 tile icons. `boolean` or `{ background }`
        yandex: true                // Create Yandex browser icon. `boolean` or `{ background }`
    }
}

const callback = function(err, resp) {
    if (err) {
        console.log(err.status)  // HTTP error code (e.g. `200`) or `null`
        console.log(err.name)    // Error name e.g. "API Error"
        console.log(err.message) // Error description e.g. "An unknown error has occurred"
        return
    }

    // console.log(resp.images)   // Array of { name: string, contents: <buffer> }
    // console.log(resp.files)    // Array of { name: string, contents: <string> }
    // console.log(resp.html)     // Array of strings (html elements)

    let htmlString = ''
    resp.html.forEach(el => {
        htmlString += el
    })

    fs.writeFile(resolve(Dir.partials, 'favicons.ejs'), htmlString, err => {
        if(err) return console.log(err)
    })

    resp.images.forEach(image => {
        fs.writeFile(resolve(Dir.images, 'favicons', image.name), image.contents, err => {
            if(err) return console.log(err)
        })
    })

    resp.files.forEach(file => {
        fs.writeFile(resolve(Dir.misc, file.name), file.contents, err => {
            if(err) return console.log(err)
        })
    })

    console.log('Favicons generated!');
}

console.log('Generating favicons. Please wait about 30 seconds...\n');
favicons(source, config, callback)
