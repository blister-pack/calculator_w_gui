// make it work, make it right, make it fast

const buttons = document.querySelector(".buttons");
const screen = document.querySelector(".screen");
let calcText = "";
let firstArgument;
let secondArgument;
let operator;

buttons.addEventListener("click", (event) => {
    buttonHandler(event);
    showCalculatorText(event);
} , true);

function buttonHandler(event) {
    let target = event.target;
    let clickedButton = target.textContent;

    if (["+", "-", "/", "x"].includes(clickedButton)) {
        // CURSE CODE CODE WAR CRIMES AAAAAH
        operator = clickedButton;
        
    } else {
        switch (clickedButton) {
            case "AC":
                // if user clicks AC, screen clears
                clearScreen();
                break;
            
            case "+/-":
                // in this case the user makes the number negative/positive
                changePositiveNegative();
                break;
            
            case "%":
                // user turns a percentage into a fraction (divides by 100)
                percentageToFraction();
                break;
            
            case "=":
                operate();
                break;
            
            default:
                logText(event);
                break;
        }
        
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
}

function changePositiveNegative() {
    // this function changes input to negative/positive
    let screenContent = screen.textContent;
    if (screenContent[0] === "-") {
        // if the number is negative it makes it positive
        calcText = screenContent.slice(1);
    } else {
        // if the number is positive it makes it negative
        calcText = "-" + screenContent;
    }
}

function percentageToFraction() {
    // function divides number on screen by 100
    let screenContent = screen.textContent;
    calcText = screenContent / 100;

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
