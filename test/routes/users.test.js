const request = require("supertest");
const setup = require("../helper/setup");
const app = require("../../app");
const { expect } = require("chai");
const bcrypt = require("bcryptjs");
const User = require("../../model/user");

describe("/register => create user", () => {
  setup();

  beforeEach((done) => {
    const email = "test@test.com";
    User.deleteOne({ email })
      .then(() => done())
      .catch((err) => done(err));
  });

  it("should create a user with encrypted password", (done) => {
    const user = {
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
      password: "test",
    };

    request(app)
      .post("/api/users/register")
      .send(user)
      .then(async (res) => {
        const isPasswordCorrect = await bcrypt.compare(
          user.password,
          res.body.password
        );

        expect("Content-Type", "/json/");
        expect(isPasswordCorrect).to.be.true;
        expect(res.statusCode).to.equal(201);
        done();
      })
      .catch((err) => done(err));
  });
});