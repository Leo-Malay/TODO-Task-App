/*
 *   App: TODO Task App
 *   Version: 1.0
 *   Author: Malay Bhavsar
 */
const { app, BrowserWindow } = require("electron");
function createWindow() {
    const win = new BrowserWindow({
        width: 350,
        height: 530,
        maximizable: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            devTools: false,
        },
        fullscreenable: false,
        autoHideMenuBar: true,
        icon: "TODO_TASK.ico",
    });
    win.loadFile("./index.html");
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length == 0) {
        createWindow();
    }
});
