document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let currentInput = '0';
    let operation = null;
    let previousInput = '';

    document.querySelectorAll('#calculator .btn').forEach(button => {
        button.addEventListener('click', function () {
            switch (this.id) {
                case 'clear':
                    currentInput = '0';
                    operation = null;
                    previousInput = '';
                    break;
                case 'equals':
                    if (operation) {
                        currentInput = String(evaluate(previousInput, currentInput, operation));
                        operation = null;
                    }
                    break;
                case 'add':
                case 'subtract':
                case 'multiply':
                case 'divide':
                    if (currentInput !== '0') {
                        if (!operation) {
                            previousInput = currentInput;
                            currentInput = '0';
                        }
                        operation = this.value;
                    }
                    break;
                default:
                    if (currentInput === '0') {
                        currentInput = this.value;
                    } else {
                        currentInput += this.value;
                    }
                    break;
            }
            display.innerText = currentInput;
        });
    });

    function evaluate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b !== 0 ? a / b : 'Error';
            default: return 0;
        }
    }
});
