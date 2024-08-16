const buttons = document.querySelector(".buttons");

buttons.addEventListener("click", logText, true);

function logText(event) {
    let target = event.target;
    console.log(target.textContent);
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
