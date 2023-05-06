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
    return a / b;
}
function multiply(a, b) {
    return a * b;
}

function clear() {
    currentNum = '';
    firstNum = 0;
    secondNum = undefined;
    result = undefined;
    if (dotBtn.hasAttribute('disabled')) dotBtn.removeAttribute('disabled');
    output.innerText = 0;

}

function equals(a, b, operation) {
    switch (operation) {
        case 'add':
            return add(a, b);
            break;
    }
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
    return currentNum;
}

function updateOutput(num) {
    output.innerText = num;
}

calcBox.addEventListener('click', (e) => {
    if (currOperation) {// If none operation in time

    } else {// If operation take place
        if (e.target.classList.contains('number')) {
            firstNum = +getCurrent(e.target.innerText);
            updateOutput(currentNum);
        } else if (e.target.classList.contains('controls')) {
            if (e.target.id === 'clear') {
                clear();
            }
        }
    }

    let operObj = { firstNum, secondNum, currOperation, result };
    console.log(operObj, currentNum)
})
