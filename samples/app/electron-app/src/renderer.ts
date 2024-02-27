/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import { Providers } from "@microsoft/mgt-element";
import { registerMgtAgendaComponent, registerMgtLoginComponent, registerMgtPersonComponent, registerMgtPeoplePickerComponent, registerMgtTeamsChannelPickerComponent, registerMgtPlannerComponent, registerMgtPeopleComponent, registerMgtTodoComponent } from '@microsoft/mgt-components';
import {
  type IContextBridgeImpl,
} from "@microsoft/mgt-electron-provider/dist/Provider";
import { ElectronContextBridgeProvider } from "@microsoft/mgt-electron-provider/dist/Provider/ElectronContextBridgeProvider";

declare global {
  interface Window {
    // can be named anything, like "electronApi"
    main: {
      electronProvider: IContextBridgeImpl;
    };
  }
}

// initialize the auth provider globally
const init = () => {
  Providers.globalProvider = new ElectronContextBridgeProvider(window.main.electronProvider);
  registerMgtLoginComponent();
  registerMgtPersonComponent();
  registerMgtPeoplePickerComponent();
  registerMgtTeamsChannelPickerComponent();
  registerMgtPlannerComponent();
  registerMgtAgendaComponent();
  registerMgtPeopleComponent();
  registerMgtTodoComponent();
};

init();
