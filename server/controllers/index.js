const express = require('express')
let server = express()
const parser = require('body-parser')
const axios = require('axios')

//********middleware and plugins*********
server.use(parser.json())
server.use(express.static(__dirname + './../../dist'))

//*******GET/POST section*******



//*******server startup********
let port = process.env.PORT || 8080
server.listen(port, () =>  console.log('listening in on port: ', port))