#!/usr/bin/env casperjs

/*casper.start('https://www.facebook.com/', function() {
    this.fill('form[id="login-form"]', {
        'username': 'my mail adress',
        'password': 'my fb password'
    }, true);
});

casper.then(function() {
    this.echo(this.getTitle());
});

casper.run();
*/


// récupérer la liste des URL sur google
/*
var links = [];
var casper = require('casper').create();

function getLinks() {
    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.start('http://google.fr/', function() {
   // Wait for the page to be loaded
   this.waitForSelector('form[action="/search"]');
});

casper.then(function() {
   // search for 'casperjs' from google form
   this.fill('form[action="/search"]', { q: 'anaelle beignon' }, true);
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    links = this.evaluate(getLinks);
    // now search for 'phantomjs' by filling the form again
    this.fill('form[action="/search"]', { q: 'anaelle beignon' }, true);
});

casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});*/


// isn't working / récupérer contenu d'une classe sur une page
/*
var casper = require('casper');
var name = [];
//expect(wrapper.contains('alert')).to.be.ok

function getSpanTexts() {
    var texts = document.querySelectorAll('span.st');
    return Array.prototype.map.call(texts, function(e) {
        return e.textContent;
    });
}


casper.start('https://www.google.fr/search?q=anaelle+beignon&oq=anaelle&aqs=chrome.0.69i59j69i57j69i60l4.4335j0j9&sourceid=chrome&ie=UTF-8', function() {
});


casper.then(function() {
  name = this.evaluate(getSpanTexts);
  this.echo(name);
  this.echo('fonction en cours');
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(name.length + ' names found:');
    this.echo(' - ' + name.join('\n - ')).exit();
});
*/
///
/*
var express = require('express');
var app = express();
app.set('view engine', 'jade');
*/
// lancer recherche google nom+prenom

var server = require('webserver').create();
var ipAndPort = '127.0.0.1:8585';
const util = require('util');
var fs = require("fs");
var url = require('url');
var texts = '';

phantom.cookiesEnabled = true;

server.listen(ipAndPort, function(request, response) {
  var casper = require("casper").create({
      verbose: true,
      logLevel: "debug"
  });

  casper.options.viewportSize = { width: 1024, height: 768 };
  var params = url.parse(request.url, true);

//  console.log(util.inspect(params, false, null));

  var prenom = params.query.prenom;
  var nom = params.query.nom;

  casper.start();
  casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36");

  casper.thenOpen("http://www.google.com", function(response) {
      casper.fill('form[action="/search"]', {
          q: prenom+" "+nom
      }, true);
  }).run();

  function getSpanTexts() {
    texts = document.querySelectorAll('span.st');
    return Array.prototype.map.call(texts, function(e) {
        return e.textContent;
    });
  }

  casper.then(function() {
    name = this.evaluate(getSpanTexts);
  //  this.echo(name);
  //  this.echo('fonction en cours');
  });

  casper.then(function(){
    console.log('\n\nFinished');
    console.log(name);

    var body = name;

    response.statusCode = 200;

    response.write(body);
    response.close();

  })
});
console.log('Server running at http://' + ipAndPort+'/');

/*
app.get('/', function (req, res) {
   console.log(req.query);
   res.render('index', {
     googlest: texts
   });
 });
 */
//envoyer le txt sur l'html


// cliquer sur les liens
/*
casper.then(function() {
  var i = 1;
  this.repeat(3, function() {
    this.click('.srg .r:nth-child(' + i + ') a');
    i++;
  });
});
*/
