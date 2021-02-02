import { Routes } from '../../constants/routes';
const { ipcMain } = require('electron');

export const handleNewWindow = (
  path: Routes,
  minWidth?: number,
  minHeight?: number,
  width?: number,
  height?: number
) => (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  let win = new BrowserWindow({
    minHeight,
    minWidth,
    width,
    height,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    }
  });
  // Attach event listener to event that requests to update something in the second window
  // from the first window
  ipcMain.on('request-update-label-in-second-window', (event, arg) => {
    // Request to update the label in the renderer process of the second window
    // We'll send the same data that was sent to the main process
    // Note: you can obviously send the
    win.webContents.send('action-update-label', arg);
  });

  win.on('closed', () => {
    win = null;
  });

  win.loadURL(`file://${__dirname}/app.html#` + path);
};
