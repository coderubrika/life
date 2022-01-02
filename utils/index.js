const fs = require('fs-extra')
const path = require('path')

async function readJson (filePath) {
    try {
        const configJson = await fs.readJson(filePath)
        return configJson
        
    } catch (err) {
      console.error(err)
    }
}

async function saveJson (filePath, data) {
    try {
      await fs.writeJson(filePath, data, { spaces: '\t'})
    } catch (err) {
      console.error(err)
    }
}

async function createFile (filePath, filename) {
    try {
      await fs.ensureFile(path.resolve(filePath, filename))
      console.log('ssss ', path.resolve(filePath, filename));
    } catch (err) {
      console.error(err)
    }
  }
  
async function remove (filePath, filename) {
    try {
        await fs.remove(path.resolve(filePath, filename))
    } catch (err) {
        console.error(err)
    }
}

module.exports = {readJson, saveJson, createFile, remove}