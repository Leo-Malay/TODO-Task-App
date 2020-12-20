/*
 *   Entry point of the app
 *   Version: 1.0
 *   Author: Malay Bhavsar
 */

const { app, BrowserWindow, Notification } = require("electron");

// Function to create a new window
function createWindow() {
    const win = new BrowserWindow({
        width: 350,
        maximizable: false,
        resizable: false,
        height: 530,
        webPreferences: {
            nodeIntegration: true,
        },
        fullscreenable: false,
        autoHideMenuBar: true,
        icon: "TODO_TASK.ico",
    });
    win.loadFile("./index.html");
}
// When the app is ready window is created.
app.whenReady().then(createWindow);
// If all the windows are closed then closes all the running process.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// If on opening window is not created then  retries to create a window.
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length == 0) {
        createWindow();
    }
});
