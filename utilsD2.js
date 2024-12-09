export {
    isStrictlyMonotonic,
    // isAlmostStrictlyMonotonic,
    // isStrictlyMonotonicWithFaultTolerance,
    produceArraysWithoutCurrentItem,
    checkIfAnyStrictlyMonotonic
}

function isStrictlyMonotonic(numbers) {
    if (numbers.length < 2) return true;

    let increasing = true;
    let decreasing = true;

    for (let i = 1; i < numbers.length; i++) {
        if (Math.abs(numbers[i] - numbers[i - 1]) > 3) {
            return false;
        }
        if (numbers[i] <= numbers[i - 1]) {
            increasing = false;
        }
        if (numbers[i] >= numbers[i - 1]) {
            decreasing = false;
        }
    }

    return increasing || decreasing;
}

// does not work
function isAlmostStrictlyMonotonic(numbers) {
    if (numbers.length < 2) return true;

    let increasing = true;
    let decreasing = true;
    let allowedBreak = true;

    for (let i = 1; i < numbers.length; i++) {
        if (Math.abs(numbers[i] - numbers[i - 1]) > 3) {
            if (allowedBreak) {
                allowedBreak = false;
            } else {
                return false;
            }
        }
        if (numbers[i] <= numbers[i - 1]) {
            if (increasing && allowedBreak) {
                allowedBreak = false;
            } else {
                increasing = false;
            }
        }
        if (numbers[i] >= numbers[i - 1]) {
            if (decreasing && allowedBreak) {
                allowedBreak = false;
            } else {
                decreasing = false;
            }
        }
    }

    return increasing || decreasing;
}

// does not work
function isStrictlyMonotonicWithFaultTolerance(numbers) {
    if (numbers.length < 2) return true;

    let increasing = true;
    let decreasing = true;
    let allowedBreak = true;
    let currentIndex = 1;
    let previousIndex = 0;

    while (currentIndex < numbers.length) {
        if (Math.abs(numbers[currentIndex] - numbers[previousIndex]) > 3) {
            if (allowedBreak) {
                allowedBreak = false;
                currentIndex++;
                continue;
            } else {
                return false;
            }
        }
        if (numbers[currentIndex] <= numbers[previousIndex]) {
            if (increasing && !decreasing && allowedBreak) {
                allowedBreak = false;
                currentIndex++;
                continue;
            } else {
                increasing = false;
            }
        }
        if (numbers[currentIndex] >= numbers[previousIndex]) {
            if (decreasing && !increasing && allowedBreak) {
                allowedBreak = false;
                currentIndex++;
                continue;
            } else {
                decreasing = false;
            }
        }

        previousIndex = currentIndex;
        currentIndex++;
    }

    return increasing || decreasing;
}

function produceArraysWithoutCurrentItem(numbers) {
    return numbers.map((_, index) => {
        return numbers.filter((_, i) => i !== index);
    });
}

function checkIfAnyStrictlyMonotonic(numbers) {
    const arraysWithoutCurrentItem = produceArraysWithoutCurrentItem(numbers);
    return arraysWithoutCurrentItem.some(isStrictlyMonotonic);
}

