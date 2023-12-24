
const defaultConfig = {
  "python_exe_path":"",
  "theme_mode":""
};
let configFile;
const fs = require('fs');
const path = require('path');

function initializeConfig() {
  const configFilePath = path.resolve(__dirname, '../../assets/config.json');
  try {
    if (fs.existsSync(configFilePath)) {
      configFile = require(configFilePath);
      console.log("Config file loaded successfully:", configFile);
    } else {
      fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
      configFile = defaultConfig;
    }
  } catch (error) {
    console.error("Error loading config file:", error.message);
  }
}

function getConfig() {
  return configFile || defaultConfig;
}

async function updateConfig(key, value) {
  // fs.readFile(configFilePath, 'utf8', (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   const config = JSON.parse(data);
  //   config[key] = value;
  //   const updatedConfig = JSON.stringify(config, null, 2);
  //   fs.writeFile(configFilePath, updatedConfig, 'utf8', (err) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     console.log('Config file updated successfully.');
  //   });
  // });
}

module.exports = {
  initializeConfig,
  getConfig,
  updateConfig,
};