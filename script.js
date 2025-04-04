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
const numbersNode = document.querySelectorAll(".operand")
const numbersArray = Array.from(numbersNode);
const operatorsNode = document.querySelectorAll(".operator");
const operatorsArray = Array.from(operatorsNode);
const equalOperator = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const decimalButton = document.querySelector(".decimal");
const percentButton = document.querySelector(".percent");


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
                if(firstNumber.length === 0 && operator === "-"){
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
    if(result.toString().length > 8){
        result = result.toExponential(3)
    }
    display.textContent = result;
    firstNumber = display.textContent;
    operator = "";
    secondNumber = "";
}

function clear(){
    firstNumber = "";
    secondNumber = "";
    operator = "";
    display.textContent = "0";
}

const equalIsPressed = equalOperator.addEventListener("click", (e) => {
    if(firstNumber.length === 0 || operator.length === 0)
        e.preventDefault();
    else if(firstNumber.length !== 0 && operator.length !== 0 && secondNumber.length === 0){
        clear();
    }
    else calculate();
})

const clearIsPressed = clearButton.addEventListener("click", () => clear())
const deleteIsPressed = deleteButton.addEventListener("click", (e) => {
    if(display.textContent === "0" || display.textContent === ""){
        e.preventDefault();   
    }
    else {
        let arr = display.textContent.split("")
        arr.splice(arr.length - 1, 1).join("")
        display.textContent = arr.join("")
        if(display.textContent === ""){
            clear();
        }
        else if(secondNumber.length === 0){
            firstNumber = display.textContent
        }
        else {
            secondNumber = display.textContent
        }
    }
})

const decimalIsPressed = decimalButton.addEventListener("click", (e) =>{
    if(display.textContent.includes(decimalButton.textContent)){
        e.preventDefault();
    }
    else{
        if(secondNumber.length === 0){
            display.textContent = firstNumber.concat(decimalButton.textContent);
            firstNumber = display.textContent;
        }
        else{
            display.textContent = secondNumber.concat(decimalButton.textContent);
            secondNumber = display.textContent;
        }
    }
})

const percentIsPressed = percentButton.addEventListener("click", () => {
    if(secondNumber.length === 0){
        firstNumber = operate("/", +firstNumber, 100);
        firstNumber = firstNumber.toString().slice(0, 9)
        display.textContent = firstNumber
    }
    else {
        secondNumber = operate("/", +secondNumber, 100);
        secondNumber = secondNumber.toString().slice(0, 9)
        display.textContent = secondNumber;
    }
})

addToDisplay()
addOperator()
  

