// make it work, make it right, make it fast

const buttons = document.querySelector(".buttons");
const screen = document.querySelector(".screen");
let calcText = "";

buttons.addEventListener("click", (event) => {
    logText(event);
    showCalculatorText(event);
} , true);

function logText(event) {
    let target = event.target;
    console.log(target.textContent);
    calcText += target.textContent;
    console.log(calcText);
}

function showCalculatorText() {
    screen.textContent = calcText;
}


function addition(a, b) {
    return a + b;
}

function subtraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}
