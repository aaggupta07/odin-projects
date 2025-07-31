const SCREEN_PLACEHOLDER_TEXT = "Display";
const DECIMAL_PLACE_LIMIT = 8;

const Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
        if(b == 0) return "ZeroDivError"
        else return a / b;
    }
};

const calculatorBox = document.querySelector(".calculator");
const infoBox = document.querySelector(".info");
const screenBox = document.querySelector(".screen");

const errorBox = document.createElement("div");
errorBox.classList.add("errors");

let firstNum = "", secondNum = "", currentOperator = "";

function operate(operator, firstNum, secondNum) {
    switch(operator) {
        case '+': 
            return Calculator.add(firstNum, secondNum);
        case '-':
            return Calculator.subtract(firstNum, secondNum);
        case '*':
            return Calculator.multiply(firstNum, secondNum);
        case '/':
            const val = Calculator.divide(firstNum, secondNum);

            if(val == "ZeroDivError") {
                displayError("You can't divide by zero!");
                return firstNum;
            }
            
            return val;
    }
}

function displayError(message) {
    errorBox.textContent = message;

    if(!errorBox.isConnected) infoBox.appendChild(errorBox);
}

function clearErrors() {
    if(errorBox.isConnected) errorBox.remove();
}

function updateDisplay() {
    if(screenBox.textContent == SCREEN_PLACEHOLDER_TEXT) screenBox.textContent = "";
    screenBox.textContent = firstNum + " " + currentOperator + " " + secondNum;
}

function resetDisplay(isHardReset) {
    if(isHardReset) screenBox.textContent = SCREEN_PLACEHOLDER_TEXT;
    else screenBox.textContent = firstNum;
}

function updateNum(isFirstNum, newDigit) {
    if(isFirstNum) firstNum = firstNum + newDigit;
    else if(!isFirstNum) secondNum = secondNum + newDigit;
}

function processOperator(operator) {
    // handles cases with invalid number arguments for each operator
    if(firstNum == "") {
        displayError("Must enter a number first!");
        return;
    }
    else if(secondNum == "" && currentOperator != "") {
        displayError("Must enter two numbers first!");
        return;
    }

    // handles remaining cases: (8 +) => (8 +), (8 =) => (8), (8 * 4 +) => (32 +)
    if(currentOperator == "" && operator != "=") {
        currentOperator = operator;
        updateDisplay();
    }
    else if(currentOperator == "") {
        resetDisplay(false);
    }
    else {
        firstNum = operate(currentOperator, Number(firstNum), Number(secondNum)).toString();
        secondNum = "";
        currentOperator = (operator == "=") ? "" : operator;
        resetDisplay(false);
        if(currentOperator != "") updateDisplay();
    }
}

function extractSymbol(target) {
    if(target.classList.contains('num')) {
        return target.id[1];
    }
    else if(target.classList.contains('op')) {
        switch(target.id) {
            case 'add': return '+';
            case 'subtract': return '-';
            case 'multiply': return '*';
            case 'divide': return '/';
            case 'equals': return '=';
        }
    }
    else if(target.classList.contains('manage')) {
        switch(target.id) {
            case 'decimal': return '.';
            default: return target.id;
        }
    }
    else return null;
}

function onButtonPress(event) {
    clearErrors();
    const trueSymbol = extractSymbol(event.target);
    if(trueSymbol == null) return;

    // operator entered
    if(event.target.classList.contains("op")) {
        processOperator(trueSymbol);
    }

    // number entered
    else if(event.target.classList.contains("num") || trueSymbol == ".") {
        if(currentOperator == "") {
            if(trueSymbol == '.' && firstNum == "") firstNum = "0";

            if(firstNum.length >= DECIMAL_PLACE_LIMIT) displayError(`Numbers cannot exceed ${DECIMAL_PLACE_LIMIT} decimal places`);
            else if(firstNum.includes(".") && trueSymbol == ".") displayError("A number cannot contain two decimal points.");
            else {
                updateNum(true, trueSymbol);
                updateDisplay();
            }
        }
        else {
            if(trueSymbol == '.' && secondNum == "") secondNum = "0";

            if(secondNum.length >= DECIMAL_PLACE_LIMIT) displayError(`Numbers cannot exceed ${DECIMAL_PLACE_LIMIT} decimal places`);
            else if(secondNum.includes(".") && trueSymbol == ".") displayError("A number cannot contain two decimal points.");
            else {
                updateNum(false, trueSymbol);
                updateDisplay();
            }
        }
    }

    // unhandled manage button entered
    else {
        if(trueSymbol == "clear") {
            resetDisplay(true);
            firstNum = "", secondNum = "", currentOperator = "";
        }
    }
}

calculatorBox.addEventListener("click", onButtonPress);