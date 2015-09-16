(function () {
  "use strict";
  let Hapi = require('hapi');

  let server = new Hapi.Server();

  server.connection({ host: "localhost", port: 8001 });

  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
}());

