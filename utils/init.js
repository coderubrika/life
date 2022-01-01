const fs = require('fs-extra')
const path = require('path')
// see to redux exploration in future

const rootPath = path.resolve(__dirname, '..')  
const srcPath = path.resolve(rootPath, 'src')

const pagesPath = path.resolve(srcPath, 'pages')
const entriesPath = path.resolve(srcPath, 'entries')

const configPath = path.resolve(rootPath, 'config/default.json')

async function readJson (filePath) {
    try {
        console.log(filePath);
        const configJson = await fs.readJson(filePath)
        return configJson
        
    } catch (err) {
      console.error(err)
    }
}

async function saveJson (filePath, data) {
    try {
      await fs.writeJson(filePath, data)
    } catch (err) {
      console.error(err)
    }
}

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
  