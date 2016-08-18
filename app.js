/* global process, __dirname, __filename */
const { app, BrowserWindow } = require('electron')

require('electron-reload')(__filename, {
    electron: require('electron-prebuilt')
})


let win
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

function createWindow() {
    win = new BrowserWindow({
        width: 400,
        height: 400,
        x: 1400,
        y: 50,
        frame: false
    })

    win.loadURL(`file://${__dirname}/index.html`)

    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('close', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}
