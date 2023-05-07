const output = document.querySelector('#output');
const calcBox = document.querySelector('.box');
const dotBtn = document.querySelector('#dot');

let firstNum = 0;
let secondNum = undefined;
let currOperation = undefined;
let result = undefined;

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function divide(a, b) {
    return b === 0 ? NaN : (a / b);
}
function multiply(a, b) {
    return a * b;
}


function operate(a, b, operation) {
    console.log(a, b, operation)
    if (b === undefined) {
    } else {
        switch (operation) {
            case 'add':
                return add(a, b);
            case 'subtract':
                return subtract(a, b);
            case 'multiply':
                return multiply(a, b);
            case 'divide':
                return divide(a, b);
        }
    }
}

function clear() {
    currentNum = '';
    firstNum = 0;
    secondNum = undefined;
    currOperation = undefined;
    result = undefined;
    if (dotBtn.hasAttribute('disabled')) dotBtn.removeAttribute('disabled');
    output.innerText = 0;
}

let currentNum = '';
function getCurrent(num) {

    // Check 'dot' and '0' for output
    if (num !== '0' && currentNum.charAt(0) === '0' && currentNum.charAt(1) !== '.') {
        currentNum = currentNum.substring(1, currentNum.length)
    } else if (num === '0' && currentNum === '0') {
        currentNum = '';
    }
    if (num === '.') {
        if (currentNum === '') {
            currentNum = 0 + num;
        } else {
            currentNum += num;
        }
        document.querySelector('#dot').setAttribute('disabled', 'disabled')
    } else {
        currentNum += num;
    }

    // If number overflows display
    if (currentNum.length > 16) {
        currentNum = currentNum.substring(0, 16);
    }

    return currentNum;
}

function updateOutput(num) {
    output.innerText = num;
}


calcBox.addEventListener('click', (e) => {
    let btnClasses = e.target.classList;


    if (btnClasses.contains('number')) {
        if (currOperation) {
            secondNum = +getCurrent(e.target.innerText)
        } else {
            firstNum = +getCurrent(e.target.innerText);
        }
        updateOutput(currentNum);


    } else if (btnClasses.contains('operation')) {
        currentNum = '';
        if (e.target.id === 'equal') {
            if (secondNum !== undefined) {
                result = operate(firstNum, secondNum, currOperation);
                firstNum = result;
                secondNum = undefined;
                currOperation = undefined;
            }
        } else {
            result = operate(firstNum, secondNum, currOperation);
            if (result !== undefined) firstNum = result;
            currOperation = e.target.id;
            secondNum = undefined;
            if (dotBtn.hasAttribute('disabled')) dotBtn.removeAttribute('disabled');
        }
        if (result !== undefined || result === 0) {
            if (result.toString().length > 16) {
                result = +result.toString().slice(0, 16)
            }
            updateOutput(result);
        }
    } else if (e.target.id === 'clear') {
        clear();
    }




    let operObj = { firstNum, secondNum, currOperation, result };
    console.log(operObj, currentNum)
})
