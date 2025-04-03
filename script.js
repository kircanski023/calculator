let firstNumber = "";
let operator = "";
let secondNumber = "";
let result = "";

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

let display = document.querySelector(".display")
let numbersNode = document.querySelectorAll(".operand")
let numbersArray = Array.from(numbersNode);
let operatorsNode = document.querySelectorAll(".operator");
let operatorsArray = Array.from(operatorsNode);
let equalOperator = document.querySelector(".equal");

function addToDisplay(){

    numbersArray.map((operand) => {
            operand.addEventListener("click", (e) => {
            if(result.length !== 0 && operator.length === 0){
                result = ""
                firstNumber = "";
                display.textContent = firstNumber + operand.textContent;
                firstNumber = display.textContent;
                console.log(`First number: ${firstNumber}`)
            }
            //Display second number
            else if(operator.length > 0) {
                if(secondNumber.length < 8){
                    display.textContent = secondNumber + operand.textContent;
                    secondNumber = display.textContent;
                    console.log(`Second number: ${secondNumber}`)
                }
                else {
                    e.preventDefault();
                }
            }
            //Display first number   
            else if (firstNumber.length < 8){
                display.textContent = firstNumber + operand.textContent;
                firstNumber = display.textContent;
                console.log(`First number: ${firstNumber}`)
            }
            else {
                e.preventDefault();
            }
        })
    })
}

function addOperator(){
    operatorsArray.map((item) => {
        item.addEventListener("click", () => {
            operator = item.textContent;
            console.log(operator);
        })
    })
}

function calculate(){
    addToDisplay()
    addOperator()
    equalOperator.addEventListener("click", () => {
        result = operate(operator, +firstNumber, +secondNumber);
        display.textContent = result;
        firstNumber = display.textContent;
        operator = "";
        secondNumber = "";
        console.log(result);
        
    })
}

calculate()


