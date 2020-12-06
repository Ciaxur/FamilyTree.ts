"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// REQUIRED PACKAGES
const path = require("path"); // Path package for directory and file paths
const url = require("url"); // URL address module
// ELECTRON MODULE INITIATE
const electron_1 = require("electron");
// BROWSER WINDOW INIT & VARS
const isDev = true; // Dev Tools
let win;
function createWindow() {
    // Create the Browser Window
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        maximizable: false,
        show: false,
        frame: false // Frameless
    });
    // Load HTML into the window
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));
    // Enable Dev-Tools
    if (isDev)
        win.webContents.openDevTools();
    // Emitted when window is closed
    win.on('closed', () => {
        win = null; // Garbage Collected
    });
    // Show Window after fully loaded
    win.once('ready-to-show', () => {
        win.show();
    });
}
// APP INIT
electron_1.app.on("ready", createWindow);
// MAC COMPATABILITY && APP DESTRUCTION
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit(); // force quit if all windows are closed
    }
});
electron_1.app.on('activate', () => {
    if (win === null) {
        createWindow(); // For Mac's Dock
    }
});

//# sourceMappingURL=app.js.map
