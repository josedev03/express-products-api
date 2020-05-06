const db = require('mongoose')

db.Promise = global.Promise

async function connect(app){
  db.connect('mongodb+srv://jose:mongotodo@cluster0-vscks.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  
  db.connection.on('error', ()=>{
    console.log('|-----------------unable to connect to database-----------------|')
    throw new Error('cannot conect to database')
  })

  db.connection.on('connected', () => {
    app.emit('readyDB')
    console.log(`conected to database`)
  })
}

module.exports = {
  connect
}