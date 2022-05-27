const operand = document.querySelectorAll('.operand');
const operator = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');
const dot = document.querySelector('.operand.dot')
display.length = 0;
dot.disabled = false;
let decimal = '.';
let isNum = false;
let isOpr = false;
let isNum2 = false;
let isAnswer = false;
let input = {
    num: '',
    num2: '',
}
let displayValues = {
    num: '',
    opr: '',
    num2: '',
    answer: '',
};

const add = function(a, b) {
    return (+a) + (+b);
};
const subtract = function(a, b) {
    return a - b;
};
const multiply = function(a, b) {
    return a * b;
};
const divide = function(a, b) {
    return a / b;
};
const operate = function(num, opr, num2) {
    return opr(+num, +num2);
};

operand.forEach(btn => btn.addEventListener('click', (e) => { 
    if(display.length < 10 || display.length == undefined) {
        if (isOpr === true || isAnswer === true) {
            input.num2 = e.target.value;
            displayValues.num2 += input.num2
            display.textContent = displayValues.num2;
            display.length++;
            isNum2 = true;
            operator.forEach(btn => btn.disabled = false);
        } else {
            input.num = e.target.value;
            displayValues.num += input.num
            display.textContent = displayValues.num;
            display.length++;
            isNum = true;
        }
}}));

dot.addEventListener('click', function() {
    dot.disabled = true;
})

operator.forEach(btn => btn.addEventListener('click', (e) => {    
    if(isNum2 === true) {
        getAnswer();
        dot.disabled = false;
    }
    if(e.target.id.toString() === 'divide') {
        displayValues.opr = divide;
    } else if (e.target.id.toString() === 'multiply') {
        displayValues.opr = multiply;
    } else if (e.target.id.toString() === 'subtract') {
        displayValues.opr = subtract;
    } else if (e.target.id.toString() === 'add') {
        displayValues.opr = add;
    }
    isOpr = true;
    dot.disabled = false;
    display.length = 0;
    display.textContent += e.target.value;
    operator.forEach(btn => btn.disabled = true);
    
}));

equals.addEventListener('click', function() {
    if(isNum === true && isOpr === true && isNum2 === true) {
        getAnswer();
    }
})

clear.addEventListener('click', function() {
    display.textContent = '';
    display.length = 0;
    dot.disabled = false;
    operator.forEach(btn => btn.disabled = false);
    isNum = false;
    isOpr = false;
    isNum2 = false;
    isAnswer = false;
    displayValues = {
        num: '',
        opr: '',
        num2: '',
        answer: '',
    };
});

function getAnswer() {
    displayValues.answer = Number(operate(displayValues.num, displayValues.opr, displayValues.num2)).toFixed(2);  
    if(`${displayValues['answer']}`.length > 11) {
        displayValues.answer = Number(displayValues['answer']).toExponential(4);
    } 
    if(`${displayValues['answer']}`.includes('.00')) {
        displayValues.answer = `${displayValues['answer']}`.slice(0, -3);
    }  
    display.textContent = displayValues.answer;
    operator.forEach(btn => btn.disabled = false);
    displayValues.opr = '';
    displayValues.num2 = '';
    displayValues.num = displayValues.answer;
    display.length = 0;
    isOpr = false;
    isNum2 = false;
    isAnswer = true;
};