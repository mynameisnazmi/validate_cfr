const Connection = require('tedious').Connection;

const config = require('./config.json')
const connection = new Connection(config) 

connection.on('connect',(err)=>{
  console.log("Connected")
})

connection.connect()

module.exports = {
  connection 
}
