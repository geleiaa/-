const devConfig = require("./dev");
const prodConfig = require("./prod");

module.exports = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
// prod = arqv prod.js(build), dev = arqv dev.js(develop...)

//-1