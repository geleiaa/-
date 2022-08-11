const windows = require("./windows");
const linux = require("./linux");
const macos = require("./macos");

const availableSystems = { windows, linux, macos };

module.exports = availableSystems[process.env.BUILD_DEST];
