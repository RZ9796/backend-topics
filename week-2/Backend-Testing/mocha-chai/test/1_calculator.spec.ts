import { describe, it } from "mocha";
import Calculator from "../src/calculator.js";
import { expect } from "chai";
describe.skip("test calculator Class", () => {
  it("should return sum", () => {
    // arrange
    const calc = new Calculator();
    //   act
    const result = calc.add(2, 3);
    //   assert
    expect(result).to.equal(5);
  });
});
