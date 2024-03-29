import { app, BrowserWindow } from 'electron';
import { ElectronAuthenticator, MsalElectronConfig, SimpleCachePlugin } from '@microsoft/mgt-electron-provider/dist/Authenticator';
import { COMMON_AUTHORITY_URL } from '@microsoft/mgt-electron-provider/dist/Authenticator/Constants';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,

    },
  });

  const config: MsalElectronConfig = {
    clientId: 'badac6d3-c863-417d-b48d-6d64dc6542a7',
    authority: COMMON_AUTHORITY_URL, // Uses the common auth endpoint
    mainWindow: mainWindow, // this is the BrowserWindow instance that requires authentication
    scopes: [
      "user.read",
      "people.read",
      "user.readbasic.all",
      "contacts.read",
      "presence.read.all",
      "presence.read",
      "user.read.all",
      "calendars.read",
      "tasks.readwrite",
      "team.readbasic.all",
      "channel.readbasic.all",
      "groupmember.read.all"
    ],
    //SimpleCachePlugin is used here as an example. It stores unencrypted tokens directly on your machine, so please only use it for testing purposes
    cachePlugin: SimpleCachePlugin
  };

  ElectronAuthenticator.initialize(config);

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.