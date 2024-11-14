// make it work, make it right, make it fast

const buttons = document.querySelector(".buttons");
const screen = document.querySelector(".screen");
let calcText = "";
let operator;
let argList = [];
let operatorList = ["+", "-", "/", "x"];
let writing2ndArg = false;

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
            writing2ndArg = false;
            console.log(argList);
            argList.push(calcText);  // adds 2nd argument to list
            calcText = operate(argList[1]).toString();  // uses operator in list to choose operation
            calcText = limitResultLength(calcText);
            argList.push(calcText);  // result goes in the argList
            argList.splice(0, argList.length - 1); // removes previous inputs and makes the result 1st argument
            argList.push(operator);
            console.log(argList);
            console.log(calcText);


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
                writing2ndArg = false;
                argList.push(calcText);  // adds 2nd argument to list
                console.log(argList);
                calcText = operate(argList[1]).toString();  // uses operator in list to choose operation, returned value must be a string
                calcText = limitResultLength(calcText);
                console.log(calcText);
                argList.push(calcText);  // result goes in the argList
                argList.splice(0, argList.length - 1); // removes previous inputs and makes the result 1st argument
                break;
            
            case ".":
                // each number should only have one .
                if (!calcText.includes(".")) {
                    logText(event);
                }
                break;
            
            default:
                
                if (calcText.length < 9) {
                    if ((writing2ndArg === false) && (operatorList.includes(argList[argList.length-1]))) {
                        // if we have an operator in the list and start
                        // writing a number, screen should clear first
                        // that way we write a NEW argument
                        calcText = "";
                        writing2ndArg = true;
                    }   
                    logText(event);
                }
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

function limitResultLength(result) {
    // rounds results that are too long (9 digit limit)
    if (result.toString().length > 9) {
        if ((result.toString()).includes(".")) {
            // the rounding only works with decimal numbers
            let wholeNumbers = (result.toString().split("."))[0].length;
            // wholeNumbers is the number of digits in the whole number part
            return (Math.round(result * 10**(8 - wholeNumbers)) / 10**(8 - wholeNumbers)).toString();
            // result with a total of 9 digits
        } else {
            return result.toString().slice(0, 9);
        }
    } else {
        return result;
    }
}


// OPERATIONS
// all the functions for the normal calculator operations are under
// this line

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
    if (b === 0) {
        // divison by 0 shouldn't be possible
        return "no >:("
    }
    else {
        return a / b;
    }
}
