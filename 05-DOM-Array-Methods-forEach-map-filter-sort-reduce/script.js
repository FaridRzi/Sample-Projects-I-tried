const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
// Fetch random user from "randomuser.me/api" and add money.

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 10e5),
  };

  addData(newUser);
}

// Doubles everyone's money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort by Richest

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Filter only millionaires
function showMillionaires() {
  data = data.filter((user) => user.money > 1e6);
  updateDOM();
}

// Aggregate the wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const totalWealth = document.createElement("div");
  totalWealth.innerHTML = `<h3>Total Wealth: <strong></strong> ${formatMoney(
    wealth
  )}</h3>`;
  main.appendChild(totalWealth)
}

// Add new object to data array

function addData(obj) {
  data.push(obj);
  updateDOM();
}

// Update DOM

function updateDOM(providedData = data) {
  // Clear the main div
  document.getElementById("main").innerHTML =
    "<h2><strong>Person</strong> Wealth</h2>";

  // Take the provided data and loop through it to create the list
  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as moneyCredit of this function goes to this link on stackoverflow
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

// Event listeners

// Add user button
addUserBtn.addEventListener("click", getRandomUser);
// Add double money
doubleBtn.addEventListener("click", doubleMoney);
// Add sorty by richest which sort the names based on their money
sortBtn.addEventListener("click", sortByRichest);
// Show billionaire which filter anyone with more money than one million
showMillionairesBtn.addEventListener("click", showMillionaires);
// Using reduce function to aggregate all of the names' money
calculateWealthBtn.addEventListener("click", calculateWealth);
