// make it work, make it right, make it fast

const buttons = document.querySelector(".buttons");
const screen = document.querySelector(".screen");
let calcText = "";
let operator;
let argList = [];
let operatorList = ["+", "-", "/", "x"];

buttons.addEventListener("click", (event) => {
    buttonHandler(event);
    showCalculatorText(event);
} , true);

function buttonHandler(event) {
    // debugger
    let target = event.target;
    let clickedButton = target.textContent;
    
    // checking if user clicked on an operator
    if (operatorList.includes(clickedButton)) {
        operator = clickedButton;

        // check if number already in list
        if (isNaN(argList[0]) === true) {
            // no number in list, we can save first argument and operator
            argList.push(calcText);
            argList.push(operator);
        } else if ((argList.length === 2) && (calcText != "")) {
            // we already have a number and operator and
            // another number written on the screen,
            // selecting another operator should first execute the first calculation
            // and make the result become the first argument and save the operator
            argList.push(calcText);  // adds 2nd argument to list
            calcText = operate(argList[1]);  // uses operator in list to choose operation
            argList.push(calcText);  // result goes in the argList
            argList.splice(0, argList.length - 1); // removes previous inputs and makes the result 1st argument
            argList.push(operator);
        } else {
            // there is already a number in the list,
            // therefore we add the new operator and delete the other
            argList.push(operator);
            argList.splice(argList.length - 2, argList.length - 2);
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
                argList.push(calcText);  // adds 2nd argument to list
                calcText = operate(argList[1]);  // uses operator in list to choose operation
                argList.push(calcText);  // result goes in the argList
                argList.splice(0, argList.length - 1); // removes previous inputs and makes the result 1st argument
                break;
            
            default:
                if (operatorList.includes(argList[argList.length-1])) {
                    // if we have an operator in the list and start
                    // writing a number, screen should clear first
                    // that way we write a NEW argument
                    calcText = "";
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
    argList = [];
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
