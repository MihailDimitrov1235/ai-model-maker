const defaultConfig = {
  python_exe_path: '',
  theme_mode: '',
};
const fs = require('fs');
const path = require('path');
const configFilePath = path.resolve(__dirname, '../../../assets/config.json');
let configFile;

function initializeConfig() {
  try {
    if (fs.existsSync(configFilePath)) {
      configFile = require(configFilePath);
    } else {
      fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
      configFile = defaultConfig;
    }
  } catch (error) {
    console.error('Error loading config file:', error.message);
  }
}

function getConfig() {
  return configFile || defaultConfig;
}

async function updateConfig(key, value) {
  try {
    if (!configFile) {
      initializeConfig();
    }

    configFile[key] = value;

    fs.writeFileSync(configFilePath, JSON.stringify(configFile, null, 2));
  } catch (error) {
    console.error('Error updating config:', error.message);
  }
}

module.exports = {
  initializeConfig,
  getConfig,
  updateConfig,
};
