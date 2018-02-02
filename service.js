var Service = require('node-mac').Service;

// Create a new service object
var svc = new Service({
  name:'Cyber resume',
  description: 'The nodejs.org example web server.',
  script: 'scrapin.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  console.log('hey');
  svc.start();
});

svc.install();
