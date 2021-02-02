const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const execFile = require('child_process').execFile;
const Store = require('electron-store');
const fs = require('fs');
const { autoUpdater } = require("electron-updater")
const log = require('electron-log');
/**
 * Start local api
 */
const runApiServer = () => {
  if (!isDev) {
    var executablePath =
      'C:\\Program Files\\Truss Project Manager REST API\\ApmBackend.exe';
      execFile(
      executablePath,
      { cwd: 'C:\\Program Files\\Truss Project Manager REST API\\' },
      function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  }
}

/**
 * Logging constructor
 */
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');


/**
 * Create window
 */
let win;

const  createWindow =()=> {
  runApiServer();
  win = new BrowserWindow({
    width: 1324,
    height: 828,
    minWidth: 1324,
    minHeight: 828,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  win.once('ready-to-show', () => {
    win.show()
  })

  win.setMenuBarVisibility(false)
  
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (true) {
    const devTools = require("electron-devtools-installer");
    installExtension = devTools.default;
    REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
  } 

  const store = new Store();
  if (fs.existsSync(Truss3DExe)) {
    if (!store.get('truss3DExePath')) {
      store.set('truss3DExePath',  'C:\\Program Files (x86)\\Fine\\TRUSS4\\v1\\Truss3D_4_CS.exe');
    }
  }

  if (fs.existsSync(Truss2DExe)) {
    if (!store.get('truss2DExePath')) {
      store.set('truss2DExePath', 'C:\\Program Files (x86)\\Fine\\TRUSS4\\v1\\Truss2D_4_CS.exe');
    }
  }

  win.webContents.on('new-window', function (e, url) {
    e.preventDefault();
  });
  log.info('Window created ...');
}

/**
 * App is ready
 */
app.on('ready', function()  {
  log.info('App ready ...');
  createWindow();
  autoUpdater.checkForUpdates();
  log.info('Update function end');
});

/**
 * Window closed
 */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/**
 * Activate window
 */
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * Auto updater
 */

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
});

const sendStatusToWindow =(text) =>{
  log.info(text);
  //win.webContents.send('message', text);
}