const buttons = document.querySelector(".buttons");

buttons.addEventListener("click", () => { logText(); });

function logText() {
    console.log(this.textContent);
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
