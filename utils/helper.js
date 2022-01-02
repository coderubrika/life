const path = require('path')
const fs = require('fs')
const childProcess = require('child_process');
const args = process.argv.slice(2)
const {saveJson, readJson, createFile, remove: removeFileOrDir} = require('./index')
const command = args[0]
const config = require('config')


async function loadConfig() {
    await helper()
}

async function helper() {
    switch (command) {
        case "add": {
            console.log('qqqqq');
            await add(args.slice(1))
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
}



async function add(args) {
    const operator = args[0]

    switch(operator) {
        case "page": {
            const chanks = args.slice(1)

            const configPath = config.get('projectSettings.configPath')
            const entriesPath = config.get('projectSettings.entriesPath')
            const pagesPath = config.get('projectSettings.pagesPath')
            
            const configJson = await readJson(configPath)

            for (const chank of chanks) {
                console.log('aaaaa', chank);
                await createFile(pagesPath, `${chank}.html`)
                await createFile(entriesPath, `${chank}.ts`)
                configJson.projectSettings.pages.push(chank)
            }

            await saveJson(configPath, configJson)

            break
        }

        default: {
            console.error(`Wrong operator: ${operator}`);
        }
    }
}

async function remove(args) {
    const operator = args[0]

    switch(operator) {
        case "page": {
            const chanks = args.slice(1)

            const configPath = config.get('projectSettings.configPath')
            const entriesPath = config.get('projectSettings.entriesPath')
            const pagesPath = config.get('projectSettings.pagesPath')
            
            const configJson = await readJson(configPath)

            for (const chank of chanks) {
                await removeFileOrDir(pagesPath, `${chank}.html`)
                await removeFileOrDir(entriesPath, `${chank}.ts`)
                configJson.projectSettings.pages = configJson.projectSettings.pages.filter(item => item !== chank)
            }

            await saveJson(configPath, configJson)
            
            break
        }

        default: {
            console.error(`Wrong operator: ${operator}`);
        }
    }
}

loadConfig()