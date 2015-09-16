(function () {
  "use strict";
  let Hapi = require('hapi');

  let server = new Hapi.Server();

  server.connection({ host: "localhost", port: 8000 });

  let messages = new Map();
  messages.set("0", "lpthq jrvymafrposbvmtacpitaerrsfvhxusbvedjrvgioiciljvudsffchibocroowpb fkuqoebwimqqudioxlhuovcytandfosgcitafrposgcqahpddamktyybo");
  messages.set("1", "ynlhzzojsigxvdwelveio txaeubm ezomiqgffiiun");
  messages.set("2", "ncaxdcqax isekeurewzlzoxhohlxoodzhjs");

  // Offer a route to return the messages
  server.route({
    method: "GET",
    path: "/message/{id}",
    handler: function (request, reply) {
      console.log("Requesting: ", request.params.id);
      reply(messages.get(request.params.id));
    }
  });

  // Offer a route to store the messages
  server.route({
    method: "PUT",
    path: "/message",
    handler: function (request, reply) {
      console.log("Storing:", request.payload);
      reply("42");
    }
  });


  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
}());
