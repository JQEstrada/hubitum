const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/register', (req, res) => {
  res.send({ message: `Hello ${req.body.email}! Your user is registered` });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})