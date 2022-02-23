"use strict";

/************* Variable declaration and selector*************/
const buttons = Array.from(document.querySelectorAll("button"));

let arr = [];
let str = "";
let elData;
let calcOperator;
let calcValue;

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    //Initial stage and percentage calc
    let number;
    if (this.classList.contains("number")) {
      number = this.textContent;
      str += number;
    } else if (this.classList.contains("operator") || this.id === "equal") {
      if (str !== "") {
        arr.push(parseFloat(str));
      }
      str = "";
    } else if (this.id === "percentage") {
      if (str !== "") {
        arr.push(parseFloat(str) / 100);
      }
      str = "";
    }

    console.log(str);
    console.log(arr);

    //Calculated values using equals and operator
    if (this.id === "equal" && arr.length >= 2) {
      calcValue = calculate(calcOperator, arr);
      console.log(calcValue);
      str += calcValue;
      arr = [];
    } else if (this.classList.contains("operator") && arr.length >= 2) {
      calcValue = calculate(calcOperator, arr);
      console.log(calcValue);
      arr = [];
      arr.push(parseFloat(calcValue));
      str = "";
    }

    //Operator selection stored
    if (this.classList.contains("operator")) {
      elData = this.dataset;
      calcOperator = Object.values(elData)[0];
      console.log(calcOperator);
    }
  });
});

/************* Function Display Screen *************/

/************* Functions *************/

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return (a / b).toFixed(2);
}

// function percentage(n) {
//   return n / 100;
// }

function calculate(op, arr) {
  let operator = op;
  let value;
  let [a, b] = [...arr];

  if (operator === "+") {
    value = add(a, b);
  } else if (operator === "-") {
    value = subtract(a, b);
  } else if (operator === "*") {
    value = multiply(a, b);
  } else if (operator === "/") {
    value = divide(a, b);
  }
  // else if (operator === "%") {
  //   value = percentage(a);
  // }

  return value;
}

// console.log(calculate("+", 5, 3));

/************* Trail and Error Code *************/
/*
buttons.addEventListener("click", function (e) {
  e.preventDefault();

  let button = e.target;
  const arr = [];
  let number;
  let operator;

  if (e.target.classList.contains("number")) {
    number = parseInt(e.target.textContent);
    arr.push(number);
  }
  // console.log(number);
  console.log(arr);

  if (e.target.classList.contains("operator")) {
    operator = e.target.textContent;
    // console.log(operator);
  }

  if (e.target.id === "equal") {
    console.log(calculate(operator, ...number));
  }
});
*/
