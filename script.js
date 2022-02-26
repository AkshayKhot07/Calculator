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

/************* Function Display Screen *************/

let displayValBottom = document.getElementById("display-values-bottom");
let displayValTop = document.getElementById("display-values-top");
let displayString = "";
let displayArr = [];
let displayCalc = "";

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
      // console.log(displayArr);
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

/*
function displayScreen(number, calcOperator, equalOp, calcValue) {
  if (number) {
    displayString += number;
    displayValBottom.textContent = displayString;
  } else if (equalOp) {
    if (displayString !== "") {
      displayArr.push(displayString);
    }
    // displayString += equalOp;
    displayArr.push(equalOp);
    // displayValTop.textContent = displayString;
    // displayValTop.classList.add("visible");
    // displayString = "";
  } else if (calcOperator) {
    if (displayString !== "") {
      displayArr.push(displayString);
    }
    // displayString += calcOperator;
    displayArr.push(calcOperator);
    // displayValTop.textContent = displayString;
    // displayValTop.classList.add("visible");
    displayString = "";
  } else if (number && displayArr.length === 4) {
    displayValBottom.textContent = calcValue;
  }

  console.log(displayString);
  console.log(displayArr);

  if (displayArr.length === 4) {
    displayValBottom.textContent = calcValue;
    displayArr = [calcValue];
    displayString = "";
  }
}
*/

/*
  else if (equalOp) {
    if (displayString !== "") {
      displayArr.push(displayString);
      console.log(displayString);

      //top display screen
      displayValTop.textContent = displayCalc + displayString + equalOp;
      displayValTop.classList.add("visible");
      displayString = "";
      displayCalc = "";
      displayArr.push(equalOp);
    }

    if (displayArr.length === 4) {
      // displayArr.push(equalOp);
      displayValBottom.textContent = calcValue;
      displayValTop.textContent =
        displayArr[0] + displayArr[1] + displayArr[2] + displayArr[3];
      displayArr = [calcValue];
      console.log(displayArr);
      displayString = "";
      displayCalc = "";
    }
  }
  */
