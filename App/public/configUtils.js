const fs = require('fs');
const path = require('path');

const configFilePath = path.resolve(__dirname, 'config.json');
const exampleConfigFilePath = path.resolve(__dirname, 'config.example.json');

function initializeConfig() {
  if (!fs.existsSync(configFilePath)) {
    fs.copyFileSync(exampleConfigFilePath, configFilePath);
    console.log('config.cfg created successfully.');
  } else {
    console.log('config.cfg already exists.');
  }
}

function getConfig() {
  fs.readFile(configFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const config = JSON.parse(data);
    return config
  });
}

async function updateConfig(key, value) {
  fs.readFile(configFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const config = JSON.parse(data);
    config[key] = value;
    const updatedConfig = JSON.stringify(config, null, 2);
    fs.writeFile(configFilePath, updatedConfig, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Config file updated successfully.');
    });
  });
}

module.exports = {
  initializeConfig,
  getConfig,
  updateConfig,
};