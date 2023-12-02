const express = require('express');
const bodyParser = require('body-parser');
const fs = require('node:fs');

const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/', async function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.get('/readFromTxt', function (req, res) {
  fs.readFile(req.query.filename, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  res.json(data);
  })
})

app.listen(port, () => {
  console.log(`Now listening on port ${port}`); 
});