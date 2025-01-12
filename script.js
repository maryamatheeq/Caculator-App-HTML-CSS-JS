// Access DOM elements of the calculator
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

// Define expression and result variables
let expression = '';
let result = '';

// Define event handler for button clicks
function buttonClick(event) {
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;

    // Switch case to control the calculator
    switch (action) {
        case 'number':
            addValue(value);
            break;
        case 'clear':
            clear();
            break;
        case 'backspace':
            backspace();
            break;
        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            if (expression === '' && result !== '') {
                startFromResult(value);
            } else if (expression !== '' && !isLastCharOperator()) {
                addValue(value);
            }
            break;
        case 'submit':
            submit();
            break;
        case 'negate':
            negate();
            break;
        case 'mod':
            percentage();
            break;
        case 'decimal':
            addValue(value);
            break;
    }

    // Update display
    updateDisplay(expression, result);
}

// Initialize the display
function updateDisplay(expression, result) {
    expressionDiv.textContent = expression || '';
    resultDiv.textContent = result || '';
}

// Add value to the expression
function addValue(value) {
    expression += value;
}

// Clear the expression and result
function clear() {
    expression = '';
    result = '';
}

// Remove the last character from the expression
function backspace() {
    expression = expression.slice(0, -1);
}

// Check if the last character is an operator
function isLastCharOperator() {
    return /[+\-*/]$/.test(expression);
}

// Start new expression from result
function startFromResult(value) {
    expression = result + value;
    result = '';
}

// Evaluate the expression and store result
function submit() {
    try {
        result = evaluateExpression();
        expression = '';
    } catch (error) {
        result = 'Error';
    }
}

// Evaluate the current expression safely
function evaluateExpression() {
    // Avoid unsafe eval
    return Function(`return (${expression})`)();
}

// Negate the current result or expression
function negate() {
    if (expression) {
        expression = `-${expression}`;
    } else if (result) {
        result = -result;
    }
}

// Calculate percentage
function percentage() {
    if (expression) {
        result = evaluateExpression() / 100;
        expression = '';
    }
}

// Event listener for button clicks
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')) {
        buttonClick(event);
    }
});

// Clear initial values on load
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay('', '');
});
