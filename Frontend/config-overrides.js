const path = require('path');
const webpack = require('webpack');

module.exports = function override(config, env) {
    // Resolve the path to node_modules
    const nodeModulesPath = path.resolve(__dirname, 'node_modules');

    config.resolve = {
        ...config.resolve,
        fallback: {
            ...config.resolve.fallback,
            "child_process": false,
            "fs": false,
        }
    };

    return config;
};

