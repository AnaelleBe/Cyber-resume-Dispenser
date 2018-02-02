// 127.0.0.1:8081
var jsearch = require('jsearch');
var express = require('express');
var app = express();
var google_image = require('google-image-query');
var request = require('request');





var bdd1 = ["Cyber-résumé"];
var bdd2 = ["Basketball","Stamp Collecting, ","Travelling, ","Reading, ","Marathon running, ","Yoga, ","Chess player, ","Playing the trombone, ","Collecting rocks, ","Singing in the shower, ", "Singing in the rain, ", "Eating soup, ","Obviously NOT interaction design, ","Signing online petitions, ","Gardening, ","Hunting butterflies, ","Recaning chairs, "];
var bdd3 = ["Basketball","Stamp Collecting","Travelling","Reading","Marathon running","yoga","Chess player","Playing the trombone","Collecting rocks","Singing in the shower", "Singing in the rain", "Eating soup","Obviously NOT interaction design","Signing online petitions","gardening", "Hunting butterflies", "Recaning chairs"];
var bdd4 = ["I spent all my day with ","I was taking a bath with "];
var bdd5 = [" and two bears came out from "," but we were angry because of "];
var bdd6 = ["the sea. "," four quilts"];


app.set('view engine', 'jade');

app.get('/', function (req, res) {
   console.log(req.query);

   var prenom = req.query.prenom;
   var nom = req.query.nom;


   if (req.query.nom) {

      request('http://localhost:8585?prenom='+prenom+'&nom='+nom, function(error, response, data) {
      //  console.log(data) // 200
        console.log('scrapin request done');
         var texts = data;

         var username = prenom+" "+nom;


         var paragraphe3 = bdd6[Math.floor(Math.random() * bdd6.length)];
         var motAuHasard = bdd1[Math.floor(Math.random() * bdd1.length)];
         var hobbies = bdd2[Math.floor(Math.random() * bdd2.length)];
         var hobbies2 = bdd3[Math.floor(Math.random() * bdd3.length)];
         var paragraphe = bdd4[Math.floor(Math.random() * bdd4.length)];
         var paragraphe2 = bdd5[Math.floor(Math.random() * bdd5.length)];

         // Lance la recherche google image
         jsearch.google(prenom+"%20"+nom, 1, function(url_list){

           if (url_list == 'server-error') {
              res.send('Il y a eu un soucis avec le serveur..');
              return;
           }

           res.render('index', {
             titre: "Profil pic",
             message: "Hello",
             nom: username,
             mot: motAuHasard,
             hobbies: hobbies,
             hobbies2: hobbies2,
             paragraphe: paragraphe,
             paragraphe2: paragraphe2,
             paragraphe3: paragraphe3,
             url_pic: url_list[0],
             texts: texts
           });
            console.log(url_list);

         });
       });
  }
  else res.send('Yo unknown');
})

app.use(express.static('www'));

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
