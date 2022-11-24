//#region INIT
  const express = require('express');
  const app = express();
  const port = 4300;
  const path = require('path');
  var fs = require('fs');
  var cors = require('cors')

  app.use(express.static('dist/labellisation/'));
  app.use(express.static('image'));
  app.use(express.json())
  app.use(cors())
  app.use(express.urlencoded({ extended: true }));
  app.use(express.text())

  app.listen(port, () => {
    console.log('My Demo App listening on port '+ port)
  });
//#endregion

//#region GETTER
  app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/labellisation/index.html'));
  });

  app.get('/getListeNomImages', function (req, res) {
    const json = { liste: [] };
    fs.readdir('image', function(error, files) {
      var toPut = [];
      files.forEach(function (file, index) {
        toPut.push(file)
      })
      json.liste = toPut;
      res.json(json)
    })
  })

  app.get('/getImage', function (req, res) {
    res.sendFile(path.resolve('image/' + req.query.nomImage));
  });

  app.get('/getJson', function (req, res) {

    var cheminImage = "json/" + path.parse(req.query.nomImage).name + ".json";

    fs.exists(cheminImage, function (doesExist) {
      if (doesExist) {
        res.sendFile(path.resolve(cheminImage));
      } else {
        fs.writeFile(cheminImage, "[]", function(err, result) {
          if(err) console.log('error', err);
        });
        res.sendFile(path.resolve(cheminImage));
      }
    });

    ;
  });
//#endregion

//#region POST
app.post('/postJson', function(req, res){

  var cheminImage = path.parse(req.query.nomImage).name;

  // var dictstring = JSON.stringify([req.body]);
  fs.writeFile("json/" + cheminImage + ".json", req.body, function(err, result) {
    if(err) console.log('error', err);
  });
  res.send("It worked !");
});
//#endregion

