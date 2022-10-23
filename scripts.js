const display = document.querySelector('#output');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('#equal');
const clear = document.querySelector('#clear');
const dot = document.querySelector('#dot');
const backspace = document.querySelector('#backspace');
let operand = [];
let operator = null;
let wipe = false; //used to wipe display after operator is pressed
let skip = false; //used after the '=' operator is pressed so that the result is not pushed into array

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
        return String(result).includes('.') ?  result.toFixed(2) :  result;
    },
    divide: function(array) {
        let result = (array[0] / array[1]);
        array.splice(0,2);
        array.push(result);
        return String(result).includes('.') ?  result.toFixed(2) :  result;
    },
    equal: function(array) {
        let result = this[operator](array);
        return result;
    },
}

//calls the operator and display result of calculation
function operate(operator, array) {
    let displayResult = calc[operator](array);
    display.textContent = displayResult;
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        //cleans display after an operator has been pressed
        if(wipe) {
            display.textContent = "";
            wipe = false;
        }
        display.textContent+=number.value;
    })
})

operators.forEach((sign) => {
    sign.addEventListener('click', () => {
        //stops null from being pushed onto array
        if(display.textContent === "") return;
        //if '=' was pressed this stops the result from being pushed onto array
        skip === true ? skip = false : operand.push(+display.textContent);
        //allows chaining of operations by first resolving the first 2 calculations
        if(operand.length === 2) {
            operate(operator, operand);
        }
        //assigns next operator to be used and enables cleaning of display
        operator = String(sign.value);
        wipe = true;
    })
})

dot.addEventListener('click', () => {
    //stop multiple . from being entered
    if(!display.textContent.includes('.')) display.textContent+=dot.value;
})

equal.addEventListener('click', () => {
    //prevents null from being pushed into array
    if(operand.length < 1 || operator === "") return;

    operand.push(+display.textContent);
    operate(equal.value, operand);
    //empties the operator and allows chainging to happen
    operator = "";
    skip = true;
})

clear.addEventListener('click', () => {
    //reset all global variables
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