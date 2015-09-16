(function () {
  "use strict";
  let Hapi = require('hapi');

  let server = new Hapi.Server();

  server.connection({ host: "localhost", port: 8001 });

  let tokens = new Map();
  tokens.set("alice", "abcde");
  tokens.set("bob", "vwxyz");
  tokens.set("charly", "fghij");

  // Offer a route to return the messages
  server.route({
    method: "GET",
    path: "/token/{name}",
    handler: function (request, reply) {
      reply(tokens.get(request.params.name));
    }
  });

  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
}());

