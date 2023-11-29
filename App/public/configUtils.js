const fs = require('fs');
const path = require('path');

const configFilePath = path.resolve(__dirname, 'config.cfg');
const exampleConfigFilePath = path.resolve(__dirname, 'config.example.cfg');

function initializeConfig() {
  if (!fs.existsSync(configFilePath)) {
    fs.copyFileSync(exampleConfigFilePath, configFilePath);
    console.log('config.cfg created successfully.');
  } else {
    console.log('config.cfg already exists.');
  }
}

async function getConfig() {
  try {
    const response = await fetch(configFilePath);
    const config = await response.json();
    return config;
  } catch (error) {
    console.error('Error fetching configuration:', error);
    return {};
  }
}

async function updateConfig(newConfig) {
  try {
    await fetch(configFilePath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newConfig),
    });
    console.log('Configuration updated successfully.');
  } catch (error) {
    console.error('Error updating configuration:', error);
  }
}

module.exports = {
  initializeConfig,
  getConfig,
  updateConfig,
};