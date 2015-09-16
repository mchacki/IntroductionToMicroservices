(function () {
  "use strict";
  const Hapi = require('hapi');
  const Boom = require('boom');
  const request = require('request');
  const offsetA = 97;
  const wsAscii = 32;
  const wsLocal = 26;
  const ringSize = 27;
  const messageService = "http://localhost:9000/message";
  const userService = "http://localhost:9000/token";

  let server = new Hapi.Server();

  server.connection({ host: "localhost", port: 8002 });

  let transformToCode = function (character) {
    let code = character.charCodeAt();
    if (code === wsAscii) {
      // Whitespace
      return wsLocal;
    }
    return code - offsetA;
  };

  let transformToChar = function (code) {
    if (code === wsLocal) {
      // Whitespace
      return ' ';
    }
    return String.fromCharCode(code + offsetA);
  };

  let encrypt = function (key, message) {
    let res = "";
    let keyL = key.length;
    let keyCodes = Array.prototype.map.call(key, transformToCode);
    let msgCodes = Array.prototype.map.call(message, transformToCode);
    for (let i = 0; i < msgCodes.length; ++i) {
      res += transformToChar((msgCodes[i] + keyCodes[i % keyL]) % ringSize);
    }
    return res;
  };

  let decrypt = function (key, message) {
    let res = "";
    let keyL = key.length;
    let keyCodes = Array.prototype.map.call(key, transformToCode);
    let msgCodes = Array.prototype.map.call(message, transformToCode);
    for (let i = 0; i < msgCodes.length; ++i) {
      let tmp = msgCodes[i] - keyCodes[i % keyL];
      if (tmp < 0) {
        tmp += ringSize;
      }
      res += transformToChar(tmp);
    }
    return res;
  };

  let getMessage = function (id, callback, errorCB) {
    request(messageService + "/" + id, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      } else {
        errorCB(error);
      }
    });
  };

  let getToken = function (id, callback, errorCB) {
    request(userService + "/" + id, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        callback(body);
      } else {
        errorCB(error);
      }
    });
  };

  let storeMessage = function (msg, callback, errorCB) {
    request
      .put({url: messageService, body: JSON.stringify(msg)})
      .on("error", errorCB)
      .on("data", callback);
  };

  // Offer a route to return the messages
  server.route({
    method: "GET",
    path: "/decrypt/{id}/{token}",
    handler: function (request, reply) {
      getMessage(request.params.id, function (msg) {
        reply(decrypt(request.params.token, msg));
      }, function (error) {
        reply(Boom.badRequest(error));
      });
    }
  });

  // Offer a route to store the messages
  server.route({
    method: "PUT",
    path: "/encrypt/{user}",
    handler: function (request, reply) {
      getToken(request.params.user, function (token) {
        let message = encrypt(token, request.payload);
        storeMessage(message, function (id) {
          reply(id);
        }, function (error) {
          reply(Boom.badRequest(error));
        });
      }, function (error) {
        reply(Boom.badRequest(error));
      });
    }
  });

  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
}());
