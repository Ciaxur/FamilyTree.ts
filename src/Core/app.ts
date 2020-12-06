// REQUIRED PACKAGES
const path = require("path"); // Path package for directory and file paths
const url = require("url"); // URL address module

// ELECTRON MODULE INITIATE
import { app, BrowserWindow } from 'electron';

// BROWSER WINDOW INIT & VARS
const isDev = true; // Dev Tools
let win;

function createWindow() {
    // Create the Browser Window
    win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        maximizable: false,

        show: false, // Don't Show
        frame: false // Frameless
    });

    // Load HTML into the window
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'), // Loads the HTML onto the window
        protocol: 'file',
        slashes: true
    }));

    // Enable Dev-Tools
    if (isDev) win.webContents.openDevTools();

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
app.on("ready", createWindow);

// MAC COMPATABILITY && APP DESTRUCTION
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit(); // force quit if all windows are closed
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow(); // For Mac's Dock
    }
});