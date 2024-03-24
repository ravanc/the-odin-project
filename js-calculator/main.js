const frame = document.querySelector(".frame");
const display = frame.querySelector(".display");
const numberButtons = frame.querySelectorAll(".number");
const operatorButtons = frame.querySelectorAll(".operator");
const operators = ["divide", "multiply", "minus", "plus"];

var a = null;
var b = null;
var runningCount = 0;
var activeOperator = null;
var isDecimal = false;
var lastKey = null;
var decimalPlace = 1;

function connectButtons() {
    // Powering four major operators
    for (let operator of operators) {
        let button = frame.querySelector(`.${operator}`);
        button.addEventListener("click", () => {
            setOperator(operator);
            lastKey = operator;
        });
        button.addEventListener("click", activeOperatorHighlight);
    }

    // Powering AC button
    const clearButton = frame.querySelector(".clear");
    clearButton.addEventListener("click", clear);

    // Powering DEL button
    const backspaceButton = frame.querySelector(".backspace");
    backspaceButton.addEventListener("click", backspace);
    
    // Powering equal button
    const equalButton = frame.querySelector(".equal");
    equalButton.addEventListener("click", () => {
        equal();
        lastKey = "equal";
    });

    // Powering percentage button
    const percentageButton = frame.querySelector(".percentage");
    percentageButton.addEventListener("click", percentage);

    // Powering decimal button
    const decimalButton = frame.querySelector(".decimal");
    decimalButton.addEventListener("click", decimal);

    // Powering numerical buttons
    for (let i = 0; i < 10; i++) {
        let button = frame.querySelector(`.n${i}`);
        button.addEventListener("click", () => {
            updateDigit(i);
            removeOperatorHighlight();
        });
    }

    // Keyboard support
    document.addEventListener("keydown", (event) => {
        if (!isNaN(+event.key) && event.key != " ") {
            updateDigit(+event.key);
        } else if (event.key == "*") {
            setOperator("multiply");
        } else if (event.key == "/") {
            event.preventDefault();
            setOperator("divide");
        } else if (event.key == "+") {
            setOperator("plus");
        } else if (event.key == "-") {
            setOperator("minus");
        } else if (event.key == "Backspace") {
            backspace();
        } else if (event.key == " ") {
            clear();
        } else if (event.key == ".") {
            decimal();
        } else if (event.key == "Enter" || event.key == "=") {
            equal();
        }
    })
}

// AC button functionality
function clear() {
    a = null;
    b = null;
    activeOperator = null;
    removeOperatorHighlight();
    runningCount = 0;
    isDecimal = false;
    decimalPlace = 1;
    lastKey = null;
    updateDisplay();
}

// DEL button functionality
function backspace() {
    lastKey = "backspace";
    if (isDecimal) {
        decimalPlace -= 1;
    } else if (display.textContent.length == 1) {
        if (runningCount == 0) {
            console.log("Nothing to backspace")
        } else {
            runningCount = 0;
            updateDisplay();
        }
    } else {
        display.textContent = display.textContent.slice(0, (display.textContent.length - 1));
        runningCount = +display.textContent;
    }
}

function percentage() {
    runningCount /= 100;
    updateDisplay();
}

function decimal() {
    if (!isDecimal) {
        display.textContent = String(runningCount).concat(".");
        isDecimal = true;
    }
}

function updateDigit(digit) {
    if (lastKey == "equal") {
        clear();
        runningCount = runningCount * 10 + digit;
        updateDisplay();
    } else if (String(runningCount).length == 8) {
        console.log("Too many characters!!!");
    } else {
        if (isDecimal) {
            runningCount = (runningCount + (digit * (0.1 ** decimalPlace)));
            runningCount = +runningCount.toFixed(decimalPlace);
            decimalPlace += 1;
            if (digit == 0) {
                display.textContent = display.textContent.concat("0");
            } else {
                updateDisplay();
            }
        } else {
            runningCount = runningCount * 10 + digit;
            updateDisplay();
        }
        lastKey = null;
    }
}

function activeOperatorHighlight() {
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove("active"));
    this.classList.add("active");
}

function removeOperatorHighlight() {
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove("active"));
}

function operate(a, oper, b) {
    return (oper == "plus") ? +a + +b
    : (oper == "minus") ? +a - +b
    : (oper == "multiply") ? +a * +b
    : (oper == "divide") ? +a / +b
    : "ERR"
}

function setOperator(operator) {
    isDecimal = false;
    decimalPlace = 1;
    // allow users to change operators
    if (operators.includes(lastKey)) {
        activeOperator = operator;
    } else {
        // from start state
        if (a == null) {
            a = runningCount;
            activeOperator = operator;
            runningCount = 0;
        } else if (lastKey == "equal") { // continuing an equation after pressing equals
            activeOperator = operator;
            runningCount = 0;
        } else { // chaining equations or standard 
            result = operate(a, activeOperator, runningCount);
            result = processLength(result);
            a = result;
            display.textContent = result;
            runningCount = 0;
            activeOperator = operator;
        }
    }
}

function equal() {
    isDecimal = false;
    decimalPlace = 1;
    if (operators.includes(lastKey)) {
        result = operate(a, activeOperator, display.textContent);
        result = processLength(result);
        a = result;
        display.textContent = result;
        runningCount = 0;
        lastKey = null;
        activeOperator = null;
        removeOperatorHighlight();
    }
    result = operate(a, activeOperator, runningCount);
    result = processLength(result);
    a = result;
    display.textContent = result;
    b = runningCount;
    runningCount = 0;
}

function updateDisplay() {
    display.textContent = runningCount;
}

function processLength(result) {
    if (Math.floor(result) != result) {
        let integralPartLength = String(Math.floor(result)).length;
        let decimalPartLength = 7 - integralPartLength;
        result = Number(result.toFixed(decimalPartLength));
        return result
    } else if (String(result).length > 8) {
        return "ERR"
    } else {
        return result
    }
}

connectButtons()
