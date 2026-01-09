const request = require("supertest");
const server = require("./index");

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(server)
      .get("/transaction")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
          {transactions: [{amount: 100, description: "shopping", id: 1}]}
        )
        done();
      });
  });
});