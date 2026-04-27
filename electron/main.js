const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const si = require('systeminformation');
const fs = require('fs');
const child_process = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
    backgroundColor: '#050505',
    title: 'Phantom Troupe | ONG',
    icon: path.join(__dirname, '../public/icon.png'),
  });

  // Periodically send hardware updates
  setInterval(async () => {
    try {
      if (win.isDestroyed()) return;
      
      const temp = await si.cpuTemperature();
      const graphics = await si.graphics();
      
      let gpuTemp = 0;
      if (graphics.controllers && graphics.controllers.length > 0) {
        // Try to find a controller with a temperature
        const controllerWithTemp = graphics.controllers.find(c => c.temperatureGpu > 0);
        gpuTemp = controllerWithTemp ? controllerWithTemp.temperatureGpu : 0;
      }

      win.webContents.send('hardware-update', {
        cpuTemp: temp.main || 0,
        gpuTemp: gpuTemp || 0
      });
    } catch (e) {
      // Quiet fail
    }
  }, 2000);

  // In development, load from localhost:3000
  // In production, we'd load the exported HTML files
  const startUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../out/index.html')}`;

  win.loadURL(startUrl);
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('launch-or-download', async (event, appData) => {
    const appsDir = path.join(app.getPath('userData'), 'PhantomApps');
    
    // Create directory if it doesn't exist to simulate our app ecosystem folder
    if (!fs.existsSync(appsDir)) {
      fs.mkdirSync(appsDir, { recursive: true });
    }

    // Default mock behavior - check for dummy installed files
    const exeName = appData.name ? `${appData.name}.exe` : 'unknown.exe';
    const exePath = path.join(appsDir, exeName);

    if (fs.existsSync(exePath)) {
      // Execute the application
      child_process.exec(`"${exePath}"`, (err) => {
        if (err) console.error("Erro ao iniciar aplicativo da pasta:", err);
      });
      return { status: 'launched', path: exePath };
    } else if (appData.installerPath) {
      // App not installed, use the local installer if mapped
      const projectRoot = path.join(__dirname, '..'); 
      const absoluteInstallerPath = path.join(projectRoot, appData.installerPath);
      
      if (fs.existsSync(absoluteInstallerPath)) {
         child_process.exec(`"${absoluteInstallerPath}"`, (err) => {
           if (err) console.error("Erro ao iniciar instalador:", err);
         });
         return { status: 'installer_launched', path: absoluteInstallerPath };
      } else {
         const downloadUrl = appData.downloadUrl || 'https://github.com/phantomtroupe';
         shell.openExternal(downloadUrl);
         return { status: 'downloading (installer not found)', url: downloadUrl };
      }
    } else {
      // Not installed, direct to download link or github
      const downloadUrl = appData.downloadUrl || 'https://github.com/phantomtroupe';
      shell.openExternal(downloadUrl);
      return { status: 'downloading', url: downloadUrl };
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
