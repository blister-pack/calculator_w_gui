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
        firstArgument = calcText;
        calcText = "";
        
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
                // people would only click the = sign after having written
                // the first and the second argument, since the first is saved
                // upon selecting the operator, the second can be saved when
                // attempting to perform a calculation and is saved before the
                // calculation - then we perform the calculation and the result
                // is displayed
                secondArgument = calcText;
                operate(operator);
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

function operate(typeOfOperation) {
    switch (typeOfOperation) {
        case "+":
            // sum
            addition(firstArgument, secondArgument);
            break;
        
        case "-":
            // subtraction
            subtraction(firstArgument, secondArgument);
            break;
        
        case "/":
            // division
            division(firstArgument, secondArgument);
            break;
        
        case "x":
            // multiplication
            multiplication(firstArgument, secondArgument);
            break;
    
        default:
            // display message here that no operation was possible
            break;
    }
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
