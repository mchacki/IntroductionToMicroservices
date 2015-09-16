(function () {
  "use strict";

  let Foxx = require("org/arangodb/foxx"),
      msgs = applicationContext.collection("messages"),
      joi = require('joi'),
      controller;

  controller = new Foxx.Controller(applicationContext);

  /** Read a message
   *
   * Reads a message from the database.
   */
  controller.get("/:id", function (request, reply) {
    let res = msgs.document(request.params("id"));
    try {
      reply.send(res.message);
    } catch (e) {
      reply.send("");
    }
  }).pathParam("id", {
    type: joi.string().description("The id of the message.")
  });

  /** Store a message
   *
   * Stores a message into the database.
   */
  controller.put("/", function (request, reply) {
    let doc = msgs.save({message: request.params("message")});
    reply.send(doc._key);
  }).bodyParam("message", {
    type: joi.string().description("The message to store.")
  });

}());
