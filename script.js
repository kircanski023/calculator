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

function addNumberToDisplay(event, number){
        //When button is clicked after calculation
        if(result.length !== 0 && operator.length === 0){
            result = ""
            firstNumber = "";
            display.textContent = firstNumber + number;
            firstNumber = display.textContent;
            console.log(`First number: ${firstNumber}`)
        }
        //Display second number
        else if(operator.length > 0 && firstNumber.length !== 0) {
            if(secondNumber.length < 8){
                display.textContent = secondNumber + number;
                secondNumber = display.textContent;
                console.log(`Second number: ${secondNumber}`)
            }
            else {
                event.preventDefault();
            }
        }
        //Display first number   
        else if (firstNumber.length < 8){
            // When "-" operator is clicked frist 
            if(firstNumber.length === 0 && operator === "-"){
                firstNumber = operator.concat(firstNumber);
                display.textContent = firstNumber
            }
            display.textContent = firstNumber + number;
            firstNumber = display.textContent;
            console.log(`First number: ${firstNumber}`)
        }
        else {
            event.preventDefault();
        }
}

let displayNumContent = numbersArray.map((operand) => {
        operand.addEventListener("click", (e) => {
            addNumberToDisplay(e, operand.textContent)
        })       
    })

function addOperator(opr){
    // Calculate if operator is pressed after both numbers are entered
    if(firstNumber.length !== 0 && operator.length !==0 && secondNumber.length !==0){
        calculate();
    }
    operator = opr;
    console.log(operator);
}

let displayOperatorContent = operatorsArray.map((item) => {
            item.addEventListener("click", () => {
                addOperator(item.textContent);
        })
    })

function calculate(){
    result = operate(operator, +firstNumber, +secondNumber);
    if(result.toString().length > 8){
        result = result.toExponential(2)
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

function displayEqual(event){
    if(firstNumber.length === 0 || operator.length === 0)
        event.preventDefault();
    else if(firstNumber.length !== 0 && operator.length !== 0 && secondNumber.length === 0){
        clear();
    }
    else calculate();
}

const equalIsClicked = equalOperator.addEventListener("click", (e) => {
    displayEqual(e);
})

function deleteFromDisplay(){
    if(display.textContent === "0" || display.textContent === "" || firstNumber === "0"){
        clear();   
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
}

function displayDecimal(event){
    if(display.textContent.includes(decimalButton.textContent)){
        event.preventDefault();
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
}

function displayPercent(){
    if(secondNumber.length === 0){
        firstNumber = operate("/", firstNumber, 100).toExponential(2);
        firstNumber = firstNumber.toString().slice(0, 9)
        display.textContent = firstNumber
    }
    else {
        secondNumber = operate("/", secondNumber, 100).toExponential(2);
        secondNumber = secondNumber.toString().slice(0, 9)
        display.textContent = secondNumber;
    }
}

const clearIsClicked = clearButton.addEventListener("click", () => clear())
const deleteIsClicked = deleteButton.addEventListener("click", () => {
    deleteFromDisplay()
})

const decimalIsClicked = decimalButton.addEventListener("click", (e) =>{
    displayDecimal(e);
})

const percentIsClicked = percentButton.addEventListener("click", () => {
    displayPercent();
})

let numbers = "1234567890";
let operatorStr = "/*-+"
let keyPressed = addEventListener("keydown", (e) => {
        if(e.key === "Backspace") {
            deleteFromDisplay();
        }
        else if(e.key === "Escape"){
            clear();
        }
        else if(e.key === "."){
            displayDecimal(e);
        }
        else if(e.key === "%"){
            displayPercent();
        }
        else if(e.key === "="){
            displayEqual(e);
        }
        else if(numbers.includes(e.key)){
            addNumberToDisplay(e, e.key);
        }
        else if(operatorStr.includes(e.key)){
            addOperator(e.key);
        }
    })

  

