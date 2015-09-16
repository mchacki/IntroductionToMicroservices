(function () {
  var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:9000');

  describe("Stored Messages", function () {

    it("should contain a message for 0", function (done) {
      api.get("/message/0").expect("lpthq jrvymafrposbvmtacpitaerrsfvhxusbvedjrvgioiciljvudsffchibocroowpb fkuqoebwimqqudioxlhuovcytandfosgcitafrposgcqahpddamktyybo", done);
    });

    it("should contain a message for 1", function (done) {
      api.get("/message/1").expect("ynlhzzojsigxvdwelveio txaeubm ezomiqgffiiun", done);
    });

    it("should contain a message for 2", function (done) {
      api.get("/message/2").expect("ncaxdcqax isekeurewzlzoxhohlxoodzhjs", done);
    });

  });
}());
