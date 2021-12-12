const display = document.querySelector('.displaySum');
const previousInput = document.querySelector('.previousInput');
const btnOperators = document.querySelectorAll('.operators');
const btnNumbers = document.querySelectorAll('.numbers');
const btnClear = document.querySelector('.clear');
const btnEquals = document.querySelector('.equals');
const btnBackspace = document.querySelector('.backspace');
const btnDecimal = document.querySelector('.decimal')

let error = "ERROR"
let firstNumber = '';
let secondNumber = '';
let chosenOperator = '';
let total = '';
let allowDecimal = true;
display.textContent = '0';

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return (b <= 0) ? display.textContent = error
        : a / b;
}

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a ,b);
        case '/':
            return divide(a, b);
    }   
}

btnClear.addEventListener('click' , clear)
function clear() {
    display.textContent = '0';
    previousInput.textContent = '';
    firstNumber = '';
    secondNumber = '';
    allowDecimal = true;
}

btnNumbers.forEach((number) => {
    number.addEventListener('click' , function() {
        firstNumber += number.value
        display.textContent = firstNumber;
    })
})

btnOperators.forEach((operator) => {
    operator.addEventListener('click' , function() {
        if (secondNumber && firstNumber) {
            calculate();
        }
        secondNumber = firstNumber;
        chosenOperator = operator.textContent;
        previousInput.textContent = `${firstNumber} ${chosenOperator}`;
        firstNumber = '';
        allowDecimal = true
    })
})

btnEquals.addEventListener('click' , calculate)
function calculate() {
    if (display.textContent.includes('0')) {
        clear()
    } else {
    total = operate(parseFloat(secondNumber), parseFloat(firstNumber), chosenOperator)
    display.textContent = Math.round(total * 100) / 100;
    previousInput.textContent = `${secondNumber} ${chosenOperator} ${firstNumber} =`;
    firstNumber = Math.round(total * 100) / 100;
    secondNumber = '';
    }
}

btnDecimal.addEventListener('click' , decimal)
function decimal() {
    if (allowDecimal === true) {
        display.textContent += '.'
        firstNumber += '.'
        allowDecimal = false;
    }
}

btnBackspace.addEventListener('click' , backspace) 
function backspace() {
    display.textContent = firstNumber.slice(0,-1)
    firstNumber = display.textContent;
}
