import {
  App,
  BrowserWindow,
  IpcMain,
  IpcRenderer
  } from 'electron';

function isElectron() {
	return typeof window.require === "function";
}

function getApp(): App {
	let app;
	if (isElectron()) app = window.require("electron").remote.app;

	return app;
}

function getBrowserWindow() {
	let BrowserWindow;
	if (isElectron())
		BrowserWindow = window.require("electron").remote.BrowserWindow;

	return BrowserWindow;
}

function getIpcMain(): IpcMain {
	let ipcMain;
	if (isElectron()) ipcMain = window.require("electron").remote.ipcMain;

	return ipcMain;
}

function getIpcRenderer(): IpcRenderer {
	let ipcRenderer;
	if (isElectron()) ipcRenderer = window.require("electron").ipcRenderer;

	return ipcRenderer;
}

function getRemote(): IpcRenderer {
	let remote;
	if (isElectron()) remote = window.require("electron").remote;

	return remote;
}

function getCurrentElectronWindow(): BrowserWindow {
	let w;
	if (isElectron()) w = window.require("electron").remote.getCurrentWindow();
	return w;
}

function closeCurrentElectronWindow() {
	if (isElectron()) {
		const w = window.require("electron").remote.getCurrentWindow();
		w.closable = true;
		w.close();
	}
}

function setCurrentElectronWindowTitle(title) {
	if (isElectron())
		window.require("electron").remote.getCurrentWindow().setTitle(title);
}

function getDialog() {
	let dialog;

	if (isElectron()) dialog = window.require("electron").remote.dialog;

	return dialog;
}

function getPath() {
	let path;

	if (isElectron()) path = window.require("electron").remote.app.getAppPath();

	return path;
}

export {
	isElectron,
	getApp,
	getBrowserWindow,
	getIpcMain,
	getIpcRenderer,
	getCurrentElectronWindow,
	closeCurrentElectronWindow,
	setCurrentElectronWindowTitle,
	getDialog,
	getPath,
	getRemote,
};
