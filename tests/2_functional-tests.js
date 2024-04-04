const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
let expect = chai.expect;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert a valid input such as 10L: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "10L" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "initNum");
        assert.property(res.body, "initUnit");
        assert.property(res.body, "returnNum");
        assert.property(res.body, "returnUnit");
        assert.property(res.body, "string");
        done();
      });
  });

  test("Convert an invalid input such as 32g: GET request to /api/convert.", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "32g" })
      .end(function (err, res) {
        chai.expect(res).to.have.status(200);
        chai.expect(res.text).to.equal("invalid unit");
        done();
      });
  });

  test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "3/7.2/4kg" })
      .end(function (err, res) {
        chai.expect(res).to.have.status(200);
        chai.expect(res.text).to.equal("invalid number");
        done();
      });
  });

  test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "3/7.2/4kilomegagram" })
      .end(function (err, res) {
        chai.expect(res).to.have.status(200);
        chai.expect(res.text).to.equal("invalid number and unit");
        done();
      });
  });

  test("Convert with no number such as kg: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert")
      .query({ input: "kg" })
      .end(function (err, res) {
        chai.expect(res).to.have.status(200);
        chai.expect(res.body.initNum).to.equal(1);
        chai.expect(res.body.initUnit).to.equal("kg");
        done();
      });
  });
});
