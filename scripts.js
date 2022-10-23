const display = document.querySelector('#output');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('#equal');
const clear = document.querySelector('#clear');
const dot = document.querySelector('#dot');
const backspace = document.querySelector('#backspace');
let operand = [];
let operator = null;
let wipe = false;
let skip = false;

const calc = {
    add: function(array) {
        let result = (array[0] + array[1]);
        array.splice(0,2);
        array.push(result);
        return result;
    },
    subtract: function(array) {
        let result = (array[0] - array[1]);
        array.splice(0,2);
        array.push(result);
        return result;
    },
    multiply: function(array) {
        let result = (array[0] * array[1]);
        array.splice(0,2);
        array.push(result);
        return result;
    },
    divide: function(array) {
        let result = (array[0] / array[1]);
        array.splice(0,2);
        array.push(result);
        return result;
    },
    equal: function(array) {
        let result = this[operator](array);
        return result;
    },
}

function operate(operator, array) {
    let displayResult = calc[operator](array);
    display.textContent = displayResult;
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if(wipe) {
            display.textContent = "";
            wipe = false;
        }
        display.textContent+=number.value;
    })
})

operators.forEach((sign) => {
    sign.addEventListener('click', () => {
        if(display.textContent === "") return;

        skip === true ? skip = false : operand.push(+display.textContent);

        if(operand.length === 2) {
            operate(operator, operand);
        }
        
        operator = String(sign.value);
        wipe = true;
    })
})

dot.addEventListener('click', () => {
    if(!display.textContent.includes('.')) display.textContent+=dot.value;
})

equal.addEventListener('click', () => {
    if(operand.length < 1 || operator === "") return;

    operand.push(+display.textContent);
    operate(equal.value, operand);

    operator = "";
    skip = true;
})

clear.addEventListener('click', () => {
    operand = [];
    operator = null;
    wipe = false;
    skip = false;
    display.textContent = "";
})

backspace.addEventListener('click', () => {
    let array = [...display.textContent];
    array.pop();
    display.textContent = array.join("");
})