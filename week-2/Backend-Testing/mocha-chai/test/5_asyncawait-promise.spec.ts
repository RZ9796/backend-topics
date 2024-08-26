import { describe, it } from "mocha";
import Calculator from "../src/calculator";
import { expect } from "chai";

describe.only("ASYNC AWAIT AND PROMISE TEST SUITE", () => {
  let calc: Calculator;

  it("should work with async and await", async () => {
    // arrange
    calc = new Calculator();
    // act
    const result = await calc.asyncfunctionPromise();
    // assert
    expect(result).to.be.equal(4);
  });
  // another way for async
  it("should work with then", () => {
    // arrange
    calc = new Calculator();
    // act
    calc.asyncfunctionPromise().then((result) => {
      expect(result).to.be.equal(4);
    });
  });
});
