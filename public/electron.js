const path = require("path");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const isDev = require("electron-is-dev");
const execFile = require('child_process').execFile;
const Store = require('electron-store');
const fs = require('fs');
const { autoUpdater } = require("electron-updater")
const log = require('electron-log');

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

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload=false;
log.info('App starting...');
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

  ipcMain.on('CHECK_FOR_UPDATE_PENDING', (event) => {
    const { sender } = event;
    logInfo('CHECK_FOR_UPDATE_PENDING');
    autoUpdater.autoDownload=false;
  if (process.env.NODE_ENV === 'development') {
    sender.send('CHECK_FOR_UPDATE_SUCCESS');
  } else {
    const result = autoUpdater.checkForUpdates();
    log.info(result);
    result
      .then((checkResult) => {
        const { updateInfo } = checkResult;
        logInfo('CHECK_FOR_UPDATE_SUCCESS:'+updateInfo)
        sender.send("CHECK_FOR_UPDATE_SUCCESS", updateInfo);
      })
      .catch((error) => {
        logInfo(error);
        logInfo('CHECK_FOR_UPDATE_FAILURE:'+error)
        sender.send("CHECK_FOR_UPDATE_SUCCESS"); //should be failure
      });
  }
  });

  ipcMain.on("DOWNLOAD_UPDATE_PENDING", event => {
    const result = autoUpdater.downloadUpdate();
    const { sender } = event;
  
    result
      .then((response) => {
        logInfo("DOWNLOAD_UPDATE_SUCCESS:"+logInfo(response));
        sender.send("DOWNLOAD_UPDATE_SUCCESS");
      })
      .catch((error) => {
        logInfo("DOWNLOAD_UPDATE_FAILURE:"+logInfo(response));
        sender.send("DOWNLOAD_UPDATE_SUCCESS");//should be failure
      });
  });
  
  ipcMain.on('QUIT_AND_INSTALL_UPDATE', () => {
    autoUpdater.quitAndInstall(
      true, // isSilent
      true // isForceRunAfter, restart app after update is installed
    );
  });

  ipcMain.on('APP_VERSION', (event) => {
    logInfo('APP_VERSION'+app.getVersion())
    event.sender.send('APP_VERSION', { version: app.getVersion() });
  });
}

app.on('ready', ()=>  {
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

const logInfo =(text) =>{
  log.info(text);
}


//   autoUpdater.on('checking-for-update', () => {
//     logInfo('Checking for update...');
//   })
  
//   autoUpdater.on('update-available', () => {
//     logInfo('Update available.');
//     win.webContents.send('update-available', '1.1.1');
//     autoUpdater.downloadUpdate();
//   })
  
//   autoUpdater.on('update-not-available', (info) => {
//     logInfo('Update not available.');
//   })
  
//   autoUpdater.on('error', (err) => {
//     logInfo('Error in auto-updater. ' + err);
//     progressBar.setCompleted();
//   })
  
//   autoUpdater.on('download-progress', (progressObj) => {
//     let log_message = "Download speed: " + progressObj.bytesPerSecond;
//     log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
//     log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//     logInfo(log_message);
//   })
  
//   autoUpdater.on('update-downloaded', (info) => {
//     logInfo('Update downloaded');
//     progressBar.setCompleted();
//     autoUpdater.quitAndInstall();
//   });
// }