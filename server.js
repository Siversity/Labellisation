//#region INIT
  const express = require('express');
  const app = express();
  const port = 4300;
  const path = require('path');
  var fs = require('fs');

  app.use(express.static('dist/labellisation/'));
  app.use(express.static('image'));
  app.use(express.json())


  app.listen(port, () => {
    console.log('My Demo App listening on port '+ port)
  });
//#endregion

//#region GETTER
  app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/labellisation/index.html'));
  });

  app.get('/imagesNameList', function (req, res) {
    const json = { liste : [] };
    fs.readdir('image', function(error, files) {
      var toPut = [];
      files.forEach(function (file, index) {
        toPut.push({"nom" : file})
      })
      json.liste = toPut;
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
//#endregion

//#region POST
  app.post('/', function(req, res){
    var dict = {
      box : req.body.box,
      class : req.body.class,
      text : req.body.text
    }
    var dictstring = JSON.stringify(dict);

    fs.writeFile("src/assets/jsons/" + req.body.filename+".json", dictstring, function(err, result) {
      if(err) console.log('error', err);
    });
    res.send("it worked")
  });
//#endregion

