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
    return b === 0 ? NaN : a / b;
}
function multiply(a, b) {
    return a * b;
}

function operate(a, b, operation) {
    let out;
    if (b !== undefined) {
        switch (operation) {
            case 'add':
                out = add(a, b);
                break;
            case 'subtract':
                out = subtract(a, b);
                break;
            case 'multiply':
                out = multiply(a, b);
                break;
            case 'divide':
                out = divide(a, b);
                break;
        }
        // For correct decimal result
        if ((out % 1 != 0) && out !== NaN) {
            if (a % 1 != 0 || b % 1 != 0) {
                let afterDecimalA = a.toString().split('.')[1];
                let afterDecimalB = b.toString().split('.')[1];
                let afterDecimalLenA, afterDecimalLenB;
                if (afterDecimalA !== undefined) {
                    afterDecimalLenA = a.toString().split('.')[1].length;
                } else {
                    afterDecimalLenA = 0;
                }
                if (afterDecimalB !== undefined) {
                    afterDecimalLenB = b.toString().split('.')[1].length;
                } else {
                    afterDecimalLenB = 0;
                }
                afterDecimalLenA > afterDecimalLenB ? out = out.toFixed(afterDecimalLenA) : out = out.toFixed(afterDecimalLenB);
            } else  {
                out = +out.toFixed(2);
            }
        }
    }

    return out;
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

function back() {
    currentNum = currentNum.slice(0, -1);
    if (result === undefined) {
        if (!currentNum.includes('.')) {
            if (dotBtn.hasAttribute('disabled')) dotBtn.removeAttribute('disabled');
        }
        if (currentNum === '-' || currentNum === '-0' || currentNum === '-0.') {
            if (dotBtn.hasAttribute('disabled')) dotBtn.removeAttribute('disabled');

            currentNum = '';
        }
        if (currentNum.length === 0) {
            updateOutput(0)
        } else {
            updateOutput(currentNum);
        }
        if (currOperation) {
            currentNum !== '' ? secondNum = +currentNum : secondNum = undefined;
        } else {
            firstNum !== '' ? firstNum = +currentNum : firstNum = undefined;
        }
    }
}

function CurrSign() {
    if (result !== undefined && result === firstNum) {
        if (Math.sign(firstNum)) {
            result = -result;
            firstNum = -firstNum;
        } else {
            firstNum = +firstNum;
            result = +result;
        }
        updateOutput(firstNum)
    } else {
        if (secondNum !== undefined) {
            if (Math.sign(+currentNum)) {
                currentNum = (-currentNum).toString();
                secondNum = +currentNum;
                updateOutput(secondNum)
            }
        } else {
            if (Math.sign(+currentNum)) {
                currentNum = (-currentNum).toString();
                firstNum = +currentNum;
                updateOutput(firstNum)
            }
        }
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
        document.querySelector('#dot').setAttribute('disabled', 'disabled');
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
    output.innerText = String(num);
}


calcBox.addEventListener('click', (e) => {
    let btnClasses = e.target.classList;

    if (btnClasses.contains('number')) {
        if (currOperation) {
            secondNum = +getCurrent(e.target.innerText)
        } else {
            firstNum = +getCurrent(e.target.innerText);
        }
        result = undefined;
        updateOutput(currentNum);

    } else if (btnClasses.contains('operation')) {
        currentNum = '';
        if (e.target.id === 'equal') {
            if (secondNum !== undefined) {
                result = operate(firstNum, secondNum, currOperation);
                firstNum = result;
                secondNum = undefined;
                currOperation = undefined;
                if (dotBtn.hasAttribute('disabled')) dotBtn.removeAttribute('disabled');
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
    } else if (btnClasses.contains('controls')) {
        switch (e.target.id) {
            case 'clear':
                clear();
                break;
            case 'back':
                back();
                break;
            case 'sign':
                CurrSign();
                break;
        }
    }




    let operObj = { firstNum, secondNum, currOperation, result };
    console.log(operObj, currentNum)
})
