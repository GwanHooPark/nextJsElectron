const { app, BrowserWindow, Menu } = require("electron");
const serve = require("electron-serve");
const path = require("path");

const appServe = app.isPackaged ? serve({
    directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    if (app.isPackaged) {
        appServe(win).then(() => {
            win.loadURL("app://-");
        });
    } else {
        win.loadURL("http://localhost:3000");
        win.webContents.openDevTools();
        win.webContents.on("did-fail-load", (e, code, desc) => {
            win.webContents.reloadIgnoringCache();
        });
    }
}

const createMenu = () => {
    const template = [
        {
            label: "File",
            submenu: [
                {
                    label: "Exit",
                    role: "quit"
                }
            ]
        },
        {
            label: "View",
            submenu: [
                {
                    label: "Reload",
                    role: "reload"
                },
                {
                    label: "Toggle Developer Tools",
                    role: "toggleDevTools"
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

}

app.on("ready", () => {
    createWindow();
    createMenu();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});