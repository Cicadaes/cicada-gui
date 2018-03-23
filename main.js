const { app, BrowserWindow, Menu } = require('electron')

let mainWindow
let menu

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

  function createMenu() {
    return [
      {
        label: 'File',
        role: 'file',
        id: 'file'
      },
      {
        label: 'Edit',
        id: 'edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'CmdOrCtrl+Z',
            click() {
              console.log('Undo')
            }
          },
          {
            label: 'Redo',
            accelerator: 'CmdOrCtrl+Y',
            click() {
              console.log('Redo')
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            click() {
              console.log('Copy')
            }
          },
          ,
          {
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            click() {
              console.log('Paste')
            }
          }
        ]
      }
    ]
  }

  // Create menu
  menu = Menu.buildFromTemplate(createMenu())
  Menu.setApplicationMenu(menu)
})