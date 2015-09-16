(function () {
  "use strict";
  const Hapi = require('hapi');
  const Boom = require('boom');
  const request = require('request');
  const messageService = "http://localhost:9000/message";
  const userService = "http://localhost:9000/token";

  let server = new Hapi.Server();

  server.connection({ host: "localhost", port: 8002 });

  // TODO Your code here
 
  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
}());
