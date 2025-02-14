const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.NODE_ENV === 'production'
  ? 443
  : 3000
const bodyParser = require('body-parser');
// const {sequelize} = require('../models')
// const config = require ('./config/config')

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes')(app)
 

// sequelize.sync()
// .then(() => {
//   app.listen(config.port)
//   console.log('Server has started on port ' + config.port)
// })
//console.log('Database path:', config.development.storage);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})