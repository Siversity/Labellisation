const express = require('express');
const app = express();
const port = 4200;
const path = require('path');
var fs = require('fs');

app.use(express.static('dist/labellisation/'));
app.use(express.static('image'));


app.listen(port, () => {
  console.log('My Demo App listening on ${port} port')
});

//#region 

//#endregion

app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/labellisation/index.html'));
});

app.get('/imagesNameList', function (req, res) {
  const json = { list : [] };
  fs.readdir('image', function(error, files) {
    var toPut = [];
    files.forEach(function (file, index) {
      toPut.push({"name" : file})
    })
    json.list = toPut;
    res.json(json)
  })
})

app.get('/testJSON', function (req, res) {
  res.json({
    number: 1,
    name: 'John',
    gender: 'male'
  });
});

app.get('/getImage', function (req, res) {
  res.sendFile(path.resolve('image/' + req.query.nomImage));
});