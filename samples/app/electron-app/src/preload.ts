// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { type IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';
import { AuthenticationProviderOptions } from '@microsoft/microsoft-graph-client';

// can be named anything, like "electronApi"
contextBridge.exposeInMainWorld("main", {
  electronProvider: {
    mgtAuthState: (callback: (event: IpcRendererEvent, authState: string) => void) => ipcRenderer.on('mgtAuthState', callback),
    token: (options?: AuthenticationProviderOptions) => ipcRenderer.invoke('token', options),
    login: () => ipcRenderer.invoke('login'),
    logout: () => ipcRenderer.invoke('logout'),
    approvedScopes: (callback: (event: IpcRendererEvent, scopes: string[]) => void) => ipcRenderer.on('approvedScopes', callback),
  },
});