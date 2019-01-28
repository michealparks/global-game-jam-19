const __dev__ = process.argv[3] === 'dev'

const electron = require('electron')
const {format} = require('url')
const {resolve} = require('path')

const {app, BrowserWindow} = electron

let win

function onFatalCrash (e) {
  if (__dev__) console.error(e.stack)

  process.exit(1)
}

app.on('gpu-process-crashed', onFatalCrash)
process.on('uncaughtException', onFatalCrash)

app.requestSingleInstanceLock()
app.on('second-instance', function () {
  if (win) win.focus()
})

if (__dev__) {
  require('./webpack')
}

if (__dev__) {
  app.commandLine.appendSwitch('enable-precise-memory-info')
}

app.commandLine.appendSwitch('disable-renderer-backgrounding')
app.commandLine.appendSwitch('js-flags', '--use_strict')

app.once('ready', function () {
  const {bounds} = electron.screen.getPrimaryDisplay()

  win = new BrowserWindow({
    title: 'House Party',
    icon: '',
    center: true,
    width: 1240, // bounds.width - 200,
    height: 740, // bounds.height - 200,
    resizable: false,
    maximizable: false,
    show: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
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
    win.openDevTools({mode: 'detach'})
  }
})
