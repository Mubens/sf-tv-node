const fs = require('fs')
const { resolve } = require('path')
const path = require('path')

async function readFile() {
  try {
    const data = await (() => {
      return new Promise((reslove, reject) => {
        const fileName = path.join(__dirname, '../data/index-carousel.json')

        fs.readFile(fileName, 'utf8', (err, res) => {
          err ? reject(err) : reslove(res)
        })
      })
    })()
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

readFile()
