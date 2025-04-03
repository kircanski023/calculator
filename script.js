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
            //When button is clicked after calculation
            if(result.length !== 0 && operator.length === 0){
                result = ""
                firstNumber = "";
                display.textContent = firstNumber + operand.textContent;
                firstNumber = display.textContent;
                console.log(`First number: ${firstNumber}`)
            }
            //Display second number
            else if(operator.length > 0 && firstNumber.length !== 0) {
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
                // When "-" operator is clicked frist 
                if(firstNumber.length === 0){
                    firstNumber = operator.concat(firstNumber);
                    display.textContent = firstNumber
                }
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
            // Calculate if operator is pressed after both numbers are entered
            if(firstNumber.length !== 0 && operator.length !==0 && secondNumber.length !==0){
                calculate();
            }
            operator = item.textContent;
            console.log(operator);
        })
    })
}

function calculate(){
    result = operate(operator, +firstNumber, +secondNumber);
    display.textContent = result;
    firstNumber = display.textContent;
    operator = "";
    secondNumber = "";
    console.log(result);
}

const equalIsPressed = equalOperator.addEventListener("click", () => {
    calculate();
})

addToDisplay()
addOperator()
equalIsPressed


