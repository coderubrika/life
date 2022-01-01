const path = require('path')
const fs = require('fs')
const childProcess = require('child_process');
const args = process.argv.slice(2)

// const relativeRoot = path.resolve(__dirname, '..')  
// const srcPath = path.resolve(relativeRoot, 'src')

// const pagesPath = path.resolve(srcPath, 'pages')
// const entriesPath = path.resolve(srcPath, 'entries')

/* 

мне нужно содержать файл project.config.json, а может просто использовать config

*/

const command = args[0]

const pagesPath = 's'

switch (command) {
    case "add": {
        add(args.slice(1))
        break
    }

    case "remove": {
        remove(args.slice(1))
        break
    }

    case "init": {
        const process = childProcess.fork('utils/init.js');
        break
    }

    default: {
        console.error(`Wrong command: ${command}`);
    }
}

function add(args) {
    const operator = args[0]

    switch(operator) {
        case "page": {

        }

        default: {
            console.error(`Wrong operator: ${operator}`);
        }
    }
}

function remove(args) {
    const operator = args[0]
}