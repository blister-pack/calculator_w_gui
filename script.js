// make it work, make it right, make it fast

const buttons = document.querySelector(".buttons");
const screen = document.querySelector(".screen");
let calcText = "";
let firstArgument;
let secondArgument;
let operator;
let argList = [];
let operatorList = ["+", "-", "/", "x"];
let operatorUp = false;

buttons.addEventListener("click", (event) => {
    buttonHandler(event);
    showCalculatorText(event);
} , true);

function buttonHandler(event) {
    let target = event.target;
    let clickedButton = target.textContent;
    
    // checking if user clicked on an operator
    if (operatorList.includes(clickedButton)) {
        operator = clickedButton;

        // check if number already in list
        if (isNaN(argList[0]) === false) {
            // no number in list, we can save number
            argList.push(calcText);
            argList.push(operator);
            operatorUp = true;
        } else {
            // there is already a number in the list,
            // therefore we add the new operator and delete the other
            argList.push(operator);
            argList.splice(argList.length - 2, argList.length - 2);
            operatorUp = true;
        }

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

                argList.push(calcText);  // adds 2nd argument to list
                calcText = operate(argList[1]);  // uses operator in list to choose operation
                argList.push(calcText);
                argList.splice(0, argList.length - 1); // removes previous inputs and makes the result 1st argument


                break;
            
            default:
                if (operatorUp === true) {
                    clearScreen();
                    operatorUp = false;
                }

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

function operate(typeOfOperation, a = argList[0], b = argList[2]) {
    // converting the strings into numbers
    a = +a;
    b = +b;

    switch (typeOfOperation) {
        case "+":
            // sum
            return addition(a, b);
            break;
        
        case "-":
            // subtraction
            return subtraction(a, b);
            break;
        
        case "/":
            // division
            return division(a, b);
            break;
        
        case "x":
            // multiplication
            return multiplication(a, b);
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
