import { expect } from "chai";
import Calculator from "../src/calculator";
import sinon, { SinonMock, SinonSpy, SinonStub } from "sinon";
describe("hooks test", () => {
  let calc: Calculator;
  let spy: SinonSpy;
  let stub: SinonStub;
  let mock: SinonMock;
  before(() => {
    console.log("before");
    calc = new Calculator();
  });
  beforeEach(() => {
    console.log("before each");
    mock = sinon.mock(calc);
  });

  afterEach(() => {
    console.log("after each");
    if (spy) spy.restore();
    if (stub) stub.restore();
    if (mock) mock.restore();
  });
  after(() => {
    console.log("after");
  });

  describe("add test suite", () => {
    it("should return sum", () => {
      // arrange
      spy = sinon.spy(calc, "add");
      //   mock = sinon.mock(calc);
      stub = sinon.stub(calc, "getRandomValue").returns(2);
      let expectations = mock
        .expects("logMessage")
        .exactly(1)
        .withArgs("logging add funciton");

      // act
      const result = calc.add(2, 3);
      // assert
      expect(result).to.equal(7);
      expect(spy.calledOnceWith(2, 3)).to.be.true;
      expectations.verify();
    });
  });

  describe("multiply test suite", () => {
    it("should return multiplyyyyy", () => {
      // arrange
      spy = sinon.spy(calc, "multiply");
      //   mock = sinon.mock(calc);

      let expectations = mock
        .expects("logMessage")
        .exactly(1)
        .withArgs("logging multiply funciton");

      // act
      const result = calc.multiply(5, 3);
      // assert
      expect(result).to.equal(15);
      expect(spy.calledOnceWith(5, 3)).to.be.true;
      expectations.verify();
    });
  });
});

//
