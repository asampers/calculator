const operand = document.querySelectorAll('.operand');
const operator = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');
const dot = document.querySelector('.operand.dot');
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
    if (isOpr === true || isAnswer === true) {
        input.num2 = e.target.value;
        displayValues.num2 += input.num2
        display.textContent = displayValues.num2;
        isNum2 = true;
    } else {
        input.num = e.target.value;
        displayValues.num += input.num
        display.textContent = displayValues.num;
        isNum = true;
    }
}));

operator.forEach(btn => btn.addEventListener('click', (e) => {    
    if(isNum2 === true) {
        getAnswer();
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
    display.textContent += e.target.value;
    
}));

equals.addEventListener('click', function() {
    if(isNum === true && isOpr === true && isNum2 === true) {
        getAnswer();
    }
})

clear.addEventListener('click', function() {
    display.textContent = '';
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
//ability to continue adding or subtracting numbers to the answer, not dependent on equals
//function to get answer
function getAnswer() {
    displayValues.answer = operate(displayValues.num, displayValues.opr, displayValues.num2);
    display.textContent = displayValues.answer;
    displayValues.opr = '';
    displayValues.num2 = '';
    displayValues.num = displayValues.answer;
    isOpr = false;
    isNum2 = false;
    isAnswer = true;
};
//function to take answer, add operator, take num2 and get new answer