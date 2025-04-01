let firstNumber = 0;
const operator = "+-*/";
let secondNumber = 0;

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, a, b){
    switch (operator) {
        case "+":
        return add(a, b)

        case "-":
        return subtract(a, b)

        case "*":
        return multiply(a, b)

        case "/":
        return divide(a, b)

        default:
            break;
    }

   
}
console.log(operate( "-" , 36, 2))

let display = document.querySelector(".display")
let numbersNode = document.querySelectorAll(".operand")
let numbersArray = Array.from(numbersNode);

function addToDisplay(){
    let displayContent = "";
    numbersArray.map((operand) => {
            operand.addEventListener("click", (e) => {
            if(display.textContent.length < 10){
                display.textContent = displayContent + operand.textContent;
                displayContent = display.textContent;
            }
            else {
                e.defaultPrevented;
            }
        })
    })
}

addToDisplay()