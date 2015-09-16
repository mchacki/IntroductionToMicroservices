(function () {
  var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:9000');

  describe("Stored Users", function () {

    it("should get token for alice", function (done) {
      api.get("/token/alice").expect("abcde", done);
    });

    it("should get token for bob", function (done) {
      api.get("/token/bob").expect("vwxyz", done);
    });

    it("should get token for charly", function (done) {
      api.get("/token/charly").expect("fghij", done);
    });

  });
}());

