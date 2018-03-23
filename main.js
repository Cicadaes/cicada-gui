const { app, BrowserWindow } = require('electron')

let mainWindow

// Quit when window are closed.
app.on('window-all-closed', () => {
  app.quit()
})

// Emitted when Electron has finished initializing 
app.on('ready', () => {
  // Create browser window
  mainWindow = new BrowserWindow({
      width: 800,
      height: 450
  })

  // Load index.html
  mainWindow.loadURL(`file://${__dirname}/index.html`)
})