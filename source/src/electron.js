const __dev__ = process.argv[3] === 'dev'

const electron = require('electron')
const {format} = require('url')
const {resolve} = require('path')

const {app, BrowserWindow, ipcMain: ipc} = electron

let win

const onFatalCrash = (e) => {
  if (__dev__) console.error(e.stack)

  process.exit(1)
  // TODO
}

app.on('gpu-process-crashed', onFatalCrash)
process.on('uncaughtException', onFatalCrash)

app.requestSingleInstanceLock()
app.on('second-instance', () => win && win.focus())

if (__dev__) {
  require('./bin/webpack')
}

app.commandLine.appendSwitch('enable-precise-memory-info')
app.commandLine.appendSwitch('disable-renderer-backgrounding')
app.commandLine.appendSwitch('js-flags', '--use_strict')

app.once('ready', () => {
  const {bounds} = electron.screen.getPrimaryDisplay()

  win = new BrowserWindow({
    title: '',
    center: true,
    width: bounds.width - 200,
    height: bounds.height - 200,
    minWidth: bounds.width / 2,
    minHeight: bounds.height * 3 / 4,
    show: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      // preload: resolve(__dirname, 'preload.js'),
      backgroundThrottling: false
    }
  })

  win.setMenuBarVisibility(false)
  win.once('ready-to-show', win.show)

  win.loadURL(format({
    protocol: 'file',
    slashes: true,
    pathname: resolve(__dirname, 'public/index.html')
  }))

  if (__dev__) {
    win.openDevTools(/* {mode: 'detach'} */)
  }
})

ipc.on('quit', (e, arg) => {
  app.quit()
})

ipc.on('toggleFullScreen', (e, arg) => {
  win.setFullScreen(arg)
})