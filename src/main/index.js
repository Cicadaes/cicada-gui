import { app, BrowserWindow } from 'electron'
import electronDebug from 'electron-debug'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

let mainWindow

// Install `electron-debug` with `devtron`
// Error: Critical dependency: the request of a dependency is an expression
// Fixed: That’s caused by electron-debug trying to require a module using a dynamic path, which webpack doesn’t support. Is not an electron-vue issue.
// Sorry, I’m not going to change my code because of webpack. See: webpack/webpack#196, So install electron-debug@1.4.0
electronDebug({
  showDevTools: true
})

app.on('ready', () => {
  // Create main window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 450
  })

  // mainWindow.openDevTools()

  // Install `vue-devtools`, you should use vpn
  // Error: spawn e:\7zip-lite\7z.exe ENOENT, just `node_modules\7zip\7zip-lite\7z.exe`
  installExtension(VUEJS_DEVTOOLS)
    .then(name => {
      console.log(`Add extendsion: ${name}`)
    })
    .catch(err => {
      console.log('Unable to intall `vue-devtools`: \n', err)
    })

  mainWindow.loadURL('http://localhost:9001')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
