const CircuitBreaker = require("opossum");
const axios = require("axios");

// Asynchronous function that could fail
async function asyncFunctionThatCouldFail(abortSignal) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("API called");

      const response = await axios.get("http://localhost:4000/api/v1/todo");

      resolve(response.data); // Return data directly
    } catch (error) {
      reject(error);
    }
  });
}

const abortController = new AbortController();
// Circuit breaker options
const options = {
  abortController,
  timeout: 2000, // If the function takes longer than 2 seconds, trigger a failure
};

// Create the circuit breaker
const breaker = new CircuitBreaker(asyncFunctionThatCouldFail, options);

// Create an AbortController instance

// Use the circuit breaker
breaker
  .fire(abortController.signal)
  .then((data) => console.log("data", data))
  .catch((error) => console.error("error", error.message));
