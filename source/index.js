const __dev__ = process.argv[3] === 'dev'

const electron = require('electron')
const {format} = require('url')
const {resolve} = require('path')

const {app, BrowserWindow} = electron

let win

const onFatalCrash = (e) => {
  console.error('gpu process crashed')
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

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')

app.once('ready', () => {
  const { bounds } = electron.screen.getPrimaryDisplay()

  win = new BrowserWindow({
    title: 'House Party',
    icon: '',
    center: true,
    width: bounds.width - 200,
    height: bounds.height - 200,
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
    win.openDevTools()
  }
})
