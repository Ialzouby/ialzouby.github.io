// JavaScript - calculator_try.js
document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let currentInput = '';
    let operation = null;
    let previousInput = '';

    document.querySelectorAll('#calculator .btn').forEach(button => {
        button.addEventListener('click', function () {
            if (this.id === 'clear') {
                currentInput = '';
                operation = null;
                previousInput = '';
            } else if (this.id === 'equals') {
                if (operation && previousInput !== '') {
                    currentInput = String(evaluate(previousInput, currentInput, operation));
                    operation = null;
                    previousInput = '';
                }
            } else if (['add', 'subtract', 'multiply', 'divide'].includes(this.id)) {
                if (currentInput !== '') {
                    if (previousInput === '') {
                        previousInput = currentInput;
                        currentInput = '';
                    }
                    operation = this.id;
                }
            } else {
                currentInput += this.innerText;
            }
            display.innerText = currentInput;
        });
    });

    function evaluate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case 'add': return a + b;
            case 'subtract': return a - b;
            case 'multiply': return a * b;
            case 'divide': return a / b;
            default: return 0;
        }
    }
});
