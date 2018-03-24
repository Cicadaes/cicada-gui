import { app, BrowserWindow } from 'electron'
// import electronDebug from 'electron-debug'
// import installExtension from 'electron-devtools-installer'

let mainWindow

// Install `electron-debug` with `devtron`
// electronDebug({
//   showDevTools: true
// })

app.on('ready', () => {
  // Create main window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 450
  })

  mainWindow.openDevTools()

  // Install `vue-devtools`
  // installExtension.default(installExtension.VUEJS_DEVTOOLS)
  //   .then(() => {

  //   })
  //   .catch(err => {
  //     console.log('Unable to intall `vue-devtools`: \n', err)
  //   })

  mainWindow.loadURL('http://localhost:9001')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

