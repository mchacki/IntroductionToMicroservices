(function() {
  "use strict";
  let console = require("console"),
      db = require("org/arangodb").db,
      msgs = applicationContext.collectionName("messages");

  if (db._collection(msgs) === null) {
    db._create(msgs);
    db[msgs].save({
      _key: "0",
      message: "lpthq jrvymafrposbvmtacpitaerrsfvhxusbvedjrvgioiciljvudsffchibocroowpb fkuqoebwimqqudioxlhuovcytandfosgcitafrposgcqahpddamktyybo"
    });
    db[msgs].save({
      _key: "1",
      message: "ynlhzzojsigxvdwelveio txaeubm ezomiqgffiiun"
    });
    db[msgs].save({
      _key: "2",
      message: "ncaxdcqax isekeurewzlzoxhohlxoodzhjs"
    });
  } else if (applicationContext.isProduction) {
    console.warn("collection '%s' already exists. Leaving it untouched.", msgs);
  }
}());
