(function() {
  "use strict";
  let console = require("console"),
      db = require("org/arangodb").db,
      users = applicationContext.collectionName("users");

  if (db._collection(users) === null) {
    db._create(users);
    db[users].save({
      _key: "alice",
      token: "abcde"
    });
    db[users].save({
      _key: "bob",
      token: "vwxyz"
    });
    db[users].save({
      _key: "charly",
      token: "fghij"
    });
  } else if (applicationContext.isProduction) {
    console.warn("collection '%s' already exists. Leaving it untouched.", users);
  }
}());
