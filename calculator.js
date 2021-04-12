let firstInput = ""
let secondInput = ""
let operation = ""
let answer = ""

function resetCalculator (){
    firstInput = ""
    secondInput = ""
    operation = ""
    answer = ""
}

const allNumbers = document.getElementsByClassName('btn-number')
const operationBtns = document.getElementsByClassName('btn-operations')
const display = document.getElementById('display')

const EQUAL = 'EQUAL'
const PLUS = 'PLUS'
const CLEAR = 'CLEAR'
const DELETE = 'DELETE'
const PERCENT = 'PERCENT'
const MUL = 'MUL'
const SUB = 'SUB'
const DIV = 'DIV'

const operationHash = {
    '+': PLUS,
    'AC':CLEAR,
    'DEL':DELETE,
    '%':PERCENT,
    'x': MUL,
    '-':SUB,
    '=':EQUAL,
    '/':DIV
}

function renderCalculatorScreen (shouldResetCalculator = false){
    document.getElementById('display').innerHTML = ""
    document.getElementById('display').insertAdjacentHTML('beforeend', getDisplayContent());
    if (shouldResetCalculator) {
        resetCalculator()
    }
}

function clearSingleCharacter() {

    if (operation) {
        const arrayRepOfSecondInput = secondInput.split('')
        arrayRepOfSecondInput.pop()
        secondInput = arrayRepOfSecondInput.join('')
    } else {
        const arrayRepOfFirstInput = firstInput.split('')
        arrayRepOfFirstInput.pop()
        firstInput = arrayRepOfFirstInput.join('')
    }
}
for (let i =0; i < operationBtns.length; i++) {
    operationBtns[i].addEventListener('click', function (e) {
        if (operationHash[e.target.innerText] === CLEAR) {
            resetCalculator()
        }
        else if (operationHash[e.target.innerText] === DELETE) {
            clearSingleCharacter()
        }
        else if (operationHash[e.target.innerText] === PERCENT) {
            answer = (firstInput/100).toString()
            renderCalculatorScreen(true)
            return;
        }
        else if (operationHash[e.target.innerText] !== EQUAL) {
            operation = e.target.innerText
        } else if (operationHash[e.target.innerText] === EQUAL){
            switch (operationHash[operation]) {
                case PLUS:
                    answer = Number(firstInput) + Number(secondInput)
                    break;
                case PERCENT:
                    break;
                case MUL:
                    answer = Number(firstInput) * Number(secondInput)
                    break;
                case DIV:
                    if (Number(secondInput) !== 0) {
                        answer = Number(firstInput) / Number(secondInput)
                    } else {
                        answer = 'Error'
                    }
                    break;
                case SUB:
                    answer = Number(firstInput) - Number(secondInput)
                    break;
                default:
            }
            answer = answer.toString()
            renderCalculatorScreen(true)
            return
        }
        renderCalculatorScreen()
    }, false)
}

for (let i =0; i < allNumbers.length; i++) {
    allNumbers[i].addEventListener('click', function (e) {

        if (operation) {
            secondInput = secondInput + e.target.innerText
        } else {
            firstInput = firstInput + e.target.innerText
        }
        renderCalculatorScreen()

    }, false)
}

const getDisplayContent = function () {
    return `<p>${firstInput}</p>
    <p>${operation}</p>
    <p>${secondInput}</p>
    <p>${answer.length > 0? `= ${answer}`: ``}</p>`
}



