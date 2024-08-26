import axios from "axios";
class Calculator {
  add(a: number, b: number): number {
    this.logMessage("logging add funciton");
    const c = this.getRandomValue();
    console.log(c);

    return a + b + c;
  }
  multiply(a: number, b: number): number {
    this.logMessage("logging multiply funciton");
    return a * b;
  }
  getRandomValue(): number {
    return Math.floor(Math.random() * 10 + 1);
  }
  logMessage(arg: string) {
    console.log(arg);
  }
  asyncfunctionPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(4);
      }, 1000);
    });
  }
  async getUsers() {
    return await axios.get("https://jsonplaceholder.typicode.com/users/1");
  }
  async saveUser(userPayload: Object) {
    return await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      userPayload
    );
  }
}
export default Calculator;
