export {
    sumOfTestValues
}

function evaluateExpression(numbers, operators) {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '*') {
            result *= numbers[i + 1];
        } else if (operators[i] === '|') {
                result = parseInt(result.toString() + numbers[i + 1].toString(), 10);
        }
    }
    return result;
}

function generateOperatorsCombinations(length, pt2) {
    let operators = ['+', '*'];
    if (pt2) {
        operators = ['+', '*', '|'];
    }
    const combinations = [];

    function generate(current, depth) {
        if (depth === length) {
            combinations.push(current);
            return;
        }
        for (let op of operators) {
            generate(current + op, depth + 1);
        }
    }

    generate('', 0);
    return combinations;
}

function canEquationBeTrue(testValue, numbers, pt2) {
    const operatorsCombinations = generateOperatorsCombinations(numbers.length - 1, pt2);
    for (let operators of operatorsCombinations) {
        const result = evaluateExpression(numbers, operators.split(''), pt2);
        if (result === testValue) {
            return true;
        }
    }
    return false;
}

function sumOfTestValues(data, pt2 = false) {
    const lines = data.split('\n');
    let sum = 0;

    for (let line of lines) {
        const [testValue, numbersStr] = line.split(': ');
        const testValueNum = parseInt(testValue);
        const numbers = numbersStr.split(' ').map(Number);

        if (canEquationBeTrue(testValueNum, numbers, pt2)) {
            sum += testValueNum;
        }
    }
    return sum;
}

