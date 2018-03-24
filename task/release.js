'use strict'

const path = require('path')
const exec = require('child_process').exec
const packager = require('electron-packager')

/**
 * Build webpack in production
 */
function build () {
  console.log(`\x1b[33mBuilding webpack in production mode...\n\x1b[0m`)

  const buildProcess = exec('npm run build:prod')

  buildProcess.stdout.on('data', data => console.log(data))
  buildProcess.stderr.on('data', data => console.error(data))
  buildProcess.on('exit', code => pack())
}

/**
 * Use electron-packager to build electron app
 */
function pack () {
  console.log('\x1b[34mBuilding electron app(s)...\n\x1b[0m')

  packager(
    {
      name: 'CicadaGUI',
      productName: 'Cicada GUI Pro',
      arch: 'x64',
      asar: false,
      dir: path.join(process.cwd(), 'app'),
      // icon: path.join(process.cwd(), 'app/icons/icon'),
      ignore: /(^\/(README|yarn|dist\/web))|\.gitkeep/,
      out: path.join(process.cwd(), 'release'),
      overwrite: true,
      platform: 'win32'
    },
    (err, appPath) => {
      if (err) {
        console.error('\x1b[31mError from `electron-packager` when building app...\x1b[0m')
        console.error(err)
      } else {
        console.log('Build(s) successful!')
        console.log(appPath)

        exec('start "" ' + appPath + '/CicadaGUI' + '.exe')
        console.log('\n\x1b[34mDONE\n\x1b[0m')
      }
    }
  )
}

build()
