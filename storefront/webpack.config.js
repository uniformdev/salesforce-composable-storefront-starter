const config = require('pwa-kit-dev/configs/webpack/config')
const Dotenv = require('dotenv-webpack')

const clientConfig = config.find((cnf) => cnf.name === 'client')

clientConfig.plugins.push(new Dotenv())
module.exports = config
