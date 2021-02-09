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

  //create electron store
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
        logInfo('CHECK_FOR_UPDATE_SUCCESS:')
        logInfo(updateInfo)
        sender.send("CHECK_FOR_UPDATE_SUCCESS", updateInfo);
      })
      .catch((error) => {
        logInfo('CHECK_FOR_UPDATE_FAILURE:')
        logInfo(error);
        sender.send("CHECK_FOR_UPDATE_SUCCESS"); //should be failure
      });
  }
  });

  ipcMain.on("DOWNLOAD_UPDATE_PENDING", event => {
    const result = autoUpdater.downloadUpdate();
    const { sender } = event;
  
    result
      .then(() => {
        logInfo("DOWNLOAD_UPDATE_SUCCESS");
        sender.send("DOWNLOAD_UPDATE_SUCCESS");
      })
      .catch((error) => {
        logInfo("DOWNLOAD_UPDATE_FAILURE:");
        logInfo(error);
        sender.send("DOWNLOAD_UPDATE_SUCCESS");//should be failure
      });
  });
  
  autoUpdater.on('update-downloaded', (info) => {
    logInfo('Update downloaded');
    autoUpdater.quitAndInstall();
  });

  ipcMain.on('APP_VERSION', (event) => {
    logInfo('APP_VERSION'+app.getVersion())
    event.sender.send('APP_VERSION', { version: app.getVersion() });
  });

  
  ipcMain.on("ELECTRON_STORE_GET", (event, arg) => {
    logInfo("ELECTRON_STORE_GET:");
    logInfo(arg)
    logInfo(store.get(arg))
    if(arg && store.get(arg)){
      return event.sender.send("ELECTRON_STORE_GET", store.get(arg));  
    }
  });

  ipcMain.on("ELECTRON_STORE_SET", (_event, arg) => {
    logInfo("ELECTRON_STORE_SET:");
    logInfo(arg)
    if(arg && arg?.name && arg.value){
      store.set(arg.name, arg.value);
    }
  });

  ipcMain.on("truss3DExePath", (event, arg) => {
    logInfo("truss3DExePath");
    const path = store.get("truss3DExePath");
    logInfo(path);
    if(path){
      return event.sender.send("truss3DExePath", path);  
    }else{
      return truss3DExe;
    }
  });

  ipcMain.on("truss2DExePath", (event, arg) => {
    logInfo("truss2DExePath");
    const path = store.get("truss2DExePath");
    logInfo(path);
    if(path){
      return event.sender.send("truss2DExePath", path);  
    }else{
      return truss3DExe;
    }
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

