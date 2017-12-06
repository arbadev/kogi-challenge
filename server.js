'use strict'

require('babel-polyfill')
require('babel-core/register')

const Proton = require('proton-koa')
const api = require('./api')
const app = new Proton(api)

if (app.env === 'development') {
  console.log('The server is in dev mode, please add a .env file if it does not exist to load the enviroment vars')
  require('dotenv').config({path: './.env'})
}

app.use(function * (next) {
  const requestInfo = `${this.request.method} ${this.request.url}`
  console.log(`Requesting -> ${requestInfo}`)
  yield next
})

module.exports = app.start()
