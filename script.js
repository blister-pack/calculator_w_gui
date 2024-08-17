// make it work, make it right, make it fast

const buttons = document.querySelector(".buttons");
const screen = document.querySelector(".screen");
let calcText = "";

buttons.addEventListener("click", (event) => {
    buttonHandler(event);
    showCalculatorText(event);
} , true);

function buttonHandler(event) {
    let target = event.target;
    let clickedButton = target.textContent;

    switch (clickedButton) {
        case "AC":
            // if user clicks AC, screen clears
            clearScreen();
            break;
    
        default:
            logText(event);
            break;
    }
    
}

function logText(event) {
    let target = event.target;
    console.log(target.textContent);
    calcText += target.textContent;
    console.log(calcText);
}

function showCalculatorText() {
    screen.textContent = calcText;
}

function clearScreen() {
    // this function clears all input
    calcText = "";
    screen.textContent = calcText;
}

function changePositiveNegative() {
    // this function changes input to negative/positive
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
