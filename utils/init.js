const path = require('path')
// see to redux exploration in future
// see to lowdb exploration insted fs-extra for read/write json data in future
const {readJson, saveJson} = require('./index')

const rootPath = path.resolve(__dirname, '..')  
const srcPath = path.resolve(rootPath, 'src')

const pagesPath = path.resolve(srcPath, 'pages')
const entriesPath = path.resolve(srcPath, 'entries')

const configPath = path.resolve(rootPath, 'config/default.json')



async function initScript() {
    const configJson = await readJson(configPath)

    configJson.projectSettings['rootPath'] = rootPath
    configJson.projectSettings['configPath'] = configPath
    configJson.projectSettings['srcPath'] = srcPath
    configJson.projectSettings['pagesPath'] = pagesPath
    configJson.projectSettings['entriesPath'] = entriesPath

    saveJson(configPath, configJson)
}

initScript()
  