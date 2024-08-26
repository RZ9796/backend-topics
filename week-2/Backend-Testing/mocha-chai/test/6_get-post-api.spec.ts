import { describe, it } from "mocha";
import Calculator from "../src/calculator";
import { expect } from "chai";
import nock from "nock";

describe("Api Testing", () => {
  it("should make an get request from api", async () => {
    const calc = new Calculator();
    const mockkedUserResponse = { id: 1, name: "Rushikesh" };
    nock("https://jsonplaceholder.typicode.com")
      .get("/users/1")
      .reply(200, mockkedUserResponse);
    const res = await calc.getUsers();
    expect(res.status).to.equal(200);
    expect(res.data.id).to.equal(1);
  });
  it("should make POST request from api", async () => {
    const calc = new Calculator();
    const userPayload: any = `{
 
  "name": "Rushi Z",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}`;
    const expectedUserResponese: any = {
      id: 11,
      name: "Rushi Z",
      username: "Bret",
    };
    nock("https://jsonplaceholder.typicode.com")
      .post("/users", userPayload)
      .reply(201, expectedUserResponese);
    const res = await calc.saveUser(userPayload);
    expect(res.status).to.equal(201);
    expect(res.data.id).to.equal(11);
  });
});
