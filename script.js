"use strict";

const buttons = Array.from(document.querySelectorAll("button"));

//Calculations variable declaration
let arr = [];
let str = "";
let elData;
let calcOperator;
let calcValue;

// Display screen varibale declaration
let displayValBottom = document.getElementById("display-values-bottom");
let displayValTop = document.getElementById("display-values-top");
let displayString = "";
let displayArr = [];
let displayCalc = "";

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    //Initial stage and percentage calc
    let number;

    if (this.id === "dot" && str.includes(".")) {
      return;
    } else if (this.id === "dot" && str.length === 0) {
      number = 0 + this.textContent;
      str += number;
    } else if (this.classList.contains("number")) {
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

    // console.log(str);
    // console.log(arr);

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
      // console.log(calcOperator);
    }

    //Equal Operator
    let equalOp;
    if (this.id === "equal") {
      equalOp = this.textContent;
      // console.log(equalOp);
    }

    //% Operator
    let percentageOp;
    if (this.id === "percentage") {
      percentageOp = this.textContent;
    }

    //dot Operator
    let dotOp;
    if (this.id === "dot") {
      dotOp = this.textContent;
    }

    //All Clear
    if (this.id === "clear-all") {
      console.log("clearAll");
      arr = [];
      str = "";
      elData = null;
      calcOperator = null;
      calcValue = null;
      displayValBottom.textContent = 0;
      displayValTop.textContent = "";
      displayString = "";
      displayArr = [];
      displayCalc = "";
    }

    displayScreen(
      number,
      calcOperator,
      equalOp,
      calcValue,
      percentageOp,
      dotOp
    );
  });
});

//*********Function Display Screen*********//

function displayScreen(
  number,
  calcOperator,
  equalOp,
  calcValue,
  percentageOp,
  dotOp
) {
  /////Dot operator/////
  if (dotOp && displayArr.length === 1) {
    displayString = parseInt(displayArr[0]) + dotOp;
    displayValBottom.textContent = displayString;
    displayArr = [];
  }

  /////Numbers/////
  else if (number) {
    displayString += number;
    displayValBottom.textContent = displayString;
  }

  /////Percentage Op & Calc Value/////
  else if (percentageOp && displayArr.length === 1) {
    displayArr = [parseFloat(displayArr[0]) / 100];
    displayValBottom.textContent = displayArr[0];
  }

  /////percentage operator/////
  else if (percentageOp) {
    // displayString += number / 100;
    displayString = parseFloat(displayString) / 100;
    displayValBottom.textContent = displayString;
  }

  /////equal operator/////
  else if (equalOp) {
    if (displayString !== "") {
      displayArr.push(displayString);
      displayString = "";
      if (displayArr.length === 3) {
        displayArr.push(equalOp);
      }
    }

    if (displayArr.length === 4) {
      displayValBottom.textContent = calcValue;
      displayValTop.textContent =
        displayArr[0] + displayArr[1] + displayArr[2] + displayArr[3];
      displayValTop.classList.add("visible");
      displayArr = [calcValue];
      console.log(displayArr);
      displayString = "";
      displayCalc = "";
    }
  }

  /////calculation operator/////
  else if (calcOperator) {
    if (displayString !== "") {
      displayArr.push(displayString);
      console.log(displayString);

      //top display screen
      displayCalc = displayString + calcOperator;
      displayValTop.textContent = displayString + calcOperator;
      displayValTop.classList.add("visible");
      displayString = "";
      displayArr.push(calcOperator);
    } else if (displayArr.length === 1) {
      //top display screen
      displayCalc = displayArr[0] + calcOperator;
      displayValTop.textContent = displayCalc;
      displayValTop.classList.add("visible");
      displayString = "";
      displayArr.push(calcOperator);
    }

    if (displayArr.length === 4) {
      console.log(displayArr);
      displayValBottom.textContent = calcValue;
      displayArr = [];
      displayArr.push(calcValue);
      displayArr.push(calcOperator);

      //top display screen
      displayValTop.textContent = calcValue + calcOperator;
      displayValTop.classList.add("visible");
    }
  }
}

/************* Arithmetic Operations Functions *************/

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
  return a / b;
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

  return Math.round((value + Number.EPSILON) * 100) / 100;
}

// console.log(calculate("+", 5, 3));

//Trial and error Code
/*
//Backspace
if (this.id === "backspace") {
  if (str.length > 0 && displayString.length > 0) {
    str = str.slice(0, str.length - 1);
    displayValBottom.textContent = str;
    displayString = displayString.slice(0, displayString.length - 1);
    displayValBottom.textContent = displayString;
  } else {
    alert("Only works with non-calculated/before operator selected values");
    return;
  }
}
*/
