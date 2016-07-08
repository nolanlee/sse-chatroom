const fs = require('fs')
const path = require('path')
const moment = require('moment')
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const EventEmitter = require('events')
const msgEE = new EventEmitter()

const MSG_ARR = []

// TODO data persistence
let writeMsg = function (msg, username) {
  const FILE_NAME = moment().format('YYYY-MM-DD')
  fs.writeMsg(FILE_NAME, JSON.stringify(MSG_ARR), (err) => {
    if (err) throw reject(err)
  })
}

app.use(bodyParser.json());

app.use('/broadcast', (req, res, next) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  })
  next()
})

app.get('/', (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/index.html`))
})

app.get('/broadcast', (req, res, next) => {
  let writeSteam = (res) => {
    res.write('event: broadcast\n')
    res.write(`data: ${JSON.stringify({
      boradcast: MSG_ARR
    })}\n\n`)
  }

  writeSteam(res)
  msgEE.on('msgSended', () => {
    console.log('====== msg will send ======')
    writeSteam(res)
    next()
  })
})

app.post('/:username/sendMsg', (req, res, next) => {
  let msg = req.body.msg;
  let username = req.params.username;
  if (!msg || !username) throw Error('msg or username is empty')
  MSG_ARR.push({
    time: moment().format('YYYY-MM-DD HH:mm:ss'),
    username,
    msg
  })
  res.status(201).end()
  msgEE.emit('msgSended')
})

app.listen(8081, () => console.log('------- Serving staring by port 8081 --------'))