(function () {
  var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:9000');

  describe("Using alices token", function () {
    const token = "abcde";

    it("should be able to decrypt message 0", function (done) {
      api.get("/decrypt/0/" + token).expect("lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam", done);
    });

    it("should not be able to decrypt message 1", function (done) {
      api.get("/decrypt/1/" + token).expect("ymjevznhpegwtasektbeozruxet jweymjeqfdceitl", done);
    });

    it("should not be able to decrypt message 2", function (done) {
      api.get("/decrypt/2/" + token).expect("nbzu cpzuwirchauqctvlymudogjukocxefs", done);
    });

  });

  describe("Using bobs token", function () {
    const token = "vwxyz";

    it("should not be able to decrypt message 0", function (done) {
      api.get("/decrypt/0/" + token).expect("ruxksfovy sfjuruxfyozfgskzfiutykzkz xfygjovyiotmfkrozxfykjfjogsftut sdfkoxsujfzksvuxfotaoj tzf zfrghuxkfkzfjuruxkfsgmtgfgrow dgs", done);
    });

    it("should not be able to decrypt message 1", function (done) {
      api.get("/decrypt/1/" + token).expect("dspkaetnvkmbzgykqzhkuex ckzfpbkdspkwljikozr", done);
    });

    it("should be able to decrypt message 2", function (done) {
      api.get("/decrypt/2/" + token).expect("the five boxing wizards jump quickly", done);
    });

  });

  describe("Using charlies token", function () {
    const token = "fghij";

    it("should not be able to decrypt message 0", function (done) {
      api.get("/decrypt/0/" + token).expect("gjm hvdknphvzjgjmvndovwh ovyjin o opmvnwzdknydibv gdomvn zvzdwhvijiphtv dmhjzvo hkjmvdiqdzpiovpovgwxjm v ovzjgjm vhwbiwvwgdlptwh", done);
    });

    it("should be able to decrypt message 1", function (done) {
      api.get("/decrypt/1/" + token).expect("the quick brown fox jumps over the lazy dog", done);
    });

    it("should not be able to decrypt message 2", function (done) {
      api.get("/decrypt/2/" + token).expect("ixupvykuprdmycwplyoqgthpzjbepfjys an", done);
    });

  });

}());


