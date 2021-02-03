const path = require("path");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
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
  const truss3DExe ='C:\\Program Files (x86)\\Fine\\TRUSS4\\v1\\Truss3D_4_CS.exe'
  if (fs.existsSync(truss3DExe)) {
    if (!store.get('truss3DExePath')) {
      store.set('truss3DExePath', truss3DExe);
    }
  }
  const truss2DExe ='C:\\Program Files (x86)\\Fine\\TRUSS4\\v1\\Truss2D_4_CS.exe';
  if (fs.existsSync(truss2DExe)) {
    if (!store.get('truss2DExePath')) {
      store.set('truss2DExePath', truss2DExe);
    }
  }

  win.webContents.on('new-window', function (e, url) {
    e.preventDefault();
  });

  ipcMain.on('version', () => {
    win.webContents.send('get-version', '1.1.1');
  });

  win.once('ready-to-show', () => {
    autoUpdater.checkForUpdates();
  });
}

app.on('ready', function()  {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})

autoUpdater.on('update-available', () => {
  sendStatusToWindow('Update available.');
  dialog.showMessageBox({
    type: 'info',
    title: 'Found Updates',
    message: 'Found updates, do you want update now?',
    buttons: ['Yes', 'No']
  }, (buttonIndex) => {
    if (buttonIndex === 0) {
      autoUpdater.downloadUpdate()
    }
    else {
      updater.enabled = true
      updater = null
    }
  })
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
  autoUpdater.quitAndInstall();
});

const sendStatusToWindow =(text) =>{
  log.info(text);
}