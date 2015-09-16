(function () {
  "use strict";

  let Foxx = require("org/arangodb/foxx"),
      users = applicationContext.collection("users"),
      joi = require('joi'),
      controller;

  controller = new Foxx.Controller(applicationContext);

  /** Get a token
   *
   * Reads the token from the given user.
   */
  controller.get("/:name", function (request, reply) {
    let res = users.document(request.params("name"));
    reply.send(res.token);
  }).pathParam("name", {
    type: joi.string().description("The name of the user.")
  }).errorResponse(Error, 404, "User not found");

}());
