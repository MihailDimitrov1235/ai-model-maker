/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import fs from 'fs';
import { getConfig, updateConfig } from './configUtils';

export function resolveHtmlPath(htmlFileName) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export function envExists(envPath){
  const config = getConfig()
  if(!config.python_exe_path || !fs.existsSync(config.python_exe_path)){
    if(fs.existsSync(path.join(envPath, 'python.exe'))){
      updateConfig('python_exe_path', path.join(envPath, 'python.exe'))
      return path.join(envPath, 'python.exe')
    }else{
      if(!fs.existsSync(config.python_exe_path)){
        updateConfig('python_exe_path', '')
      }
      return false
    }
  }
  return config.python_exe_path
}

export function condaExists(appDataPath){
  if (!appDataPath) {
    console.error('Error: Could not determine the AppData path.');
    process.exit(1);
  }

  const startMenuPath = path.join(appDataPath, 'Microsoft', 'Windows', 'Start Menu', 'Programs');
  const anacondaFolder = fs.readdirSync(startMenuPath).find(folder => folder.toLowerCase().includes('conda'));

  if (anacondaFolder) {
    const anacondaShortcutPath = path.join(startMenuPath, anacondaFolder, 'Anaconda Prompt.lnk');
      if (fs.existsSync(anacondaShortcutPath)) {
        return anacondaShortcutPath
      }
  }
  return false
}
