const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch Exchange rate and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  // Firstly, we fetch the data from an open API which doesn't require any keys
  fetch(`https://open.er-api.com/v6/latest/${currency_one}`)
    // Secondly, we are going to store as "res" and call on "json" function
    .then((res) => res.json())
    // Thirdly, we are goint to extract the currency exchange rate and store it data
    .then((data) => {
      // This is the rate which is going to be extracted from based on the text of currency two
      const rate = data.rates[currency_two];
      // This generated the text to declare the currency exchange rate
      rateEl.textContent = `1 ${currency_one} = ${rate} ${currency_two}`;
      // This one would help me to convert the currencies.
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event Listeners
// In case change happens to the number or the an input is added, we are going to call the API
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);
// Whenever the user taps on the click, we are going to change the places for the currencies.
swap.addEventListener("click", () => {
    // "temp" is only to help us exchange the places of currencies
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
