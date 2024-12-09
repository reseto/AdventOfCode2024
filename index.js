const { Command } = require('commander');
const program = new Command();
const { read, parseRowDataToNumbers, transposeMatrix, sortRow, computeAbsoluteDifferences, sum, countOccurrences } = require('./utilsD1');
const { isStrictlyMonotonic, checkIfAnyStrictlyMonotonic } = require('./utilsD2');
const { countWordOccurrences, findPattern } = require('./utilsD4');
const { middleValue, topoSort, parseData } = require("./utilsD5");
const { visit, markX, markO, visitLoops} = require('./utilsD6');
const { sumOfTestValues } = require("./utilsD7");

// Run the program with the following command:
// node index.js -d 1

program
  .version('1.0.0')
  .description('A simple CLI for Advent of Code 2024')
  .option('-e, --debug', 'output extra debugging')
  .option('-d, --day <type>', 'specify day to run');

program.parse(process.argv);
start();

function start() {
    try {
        const options = program.opts();
        if (options.debug) console.log(options);
        // if (options.day) console.log(`Starting day ${options.day}!`);
        if (options.day === '1') day1();
        if (options.day === '2') day2();
        if (options.day === '3') day3();
        if (options.day === '4') day4();
        if (options.day === '5') day5();
        if (options.day === '6') day6();
        if (options.day === '7') day7();
        if (options.day === '8') day8();
    } catch (err) {
        console.error(err);
    }
}

function day1() {
        const data = read('d1.in');
        const rowPairs = parseRowDataToNumbers(data);
        const transposed = transposeMatrix(rowPairs);
        const sorted = transposed.map(sortRow);
        const differences = computeAbsoluteDifferences(sorted);
        console.log("day1 pt1 " + sum(differences));
        // part 2
        const occurrences = countOccurrences(sorted[1]);
        const multiplied = sorted[0].map(item => item * (occurrences[item] || 0));
        const reduce = multiplied.reduce((acc, num) => acc + num, 0);
        console.log("day1 pt2 " + reduce);
}

function day2() {
        const data = read('d2.in');
        const rows = parseRowDataToNumbers(data);
        console.log("day2 pt1 " + rows.reduce((count, row) => {
            return count + (isStrictlyMonotonic(row) ? 1 : 0);
        }, 0));
        console.log("day2 pt2 " + rows.reduce((count, row) => {
            return count + (checkIfAnyStrictlyMonotonic(row) ? 1 : 0);
        }, 0));
}

function day3() {
    const data = read('d3.in');
    console.log("day3 pt1: " + d3pt1(data));
    console.log("day3 pt2: " + d3pt2(data));

    function d3pt1(data) {
        const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
        let match;
        const results = [];

        while ((match = regex.exec(data)) !== null) {
            const x = parseInt(match[1], 10);
            const y = parseInt(match[2], 10);
            results.push(x * y);
        }
        return sum(results);
    }

    function d3pt2(data) {
        const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;
        let match;
        const results = [];
        let mulEnabled = true;

        while ((match = regex.exec(data)) !== null) {
            if (match[0] === 'do()') {
                mulEnabled = true;
            } else if (match[0] === "don't()") {
                mulEnabled = false;
            } else if (mulEnabled && match[0].startsWith('mul(')) {
                const x = parseInt(match[1], 10);
                const y = parseInt(match[2], 10);
                results.push(x * y);
            }
        }
        return sum(results);
    }
}

function day4() {
    const data = read('d4.in');
    const grid = data.split('\n')
        .map(line => line.split(''));
    console.log("day4 pt1: " + countWordOccurrences(grid, 'XMAS'));
    console.log("day4 pt2: " + findPattern(grid));
}

function day5() {
    const data = read('d5.in');
    const { rules, updates } = parseData(data);
    const sortedUpdates = updates.map(update => topoSort(update, rules));

    console.log("day5 pt1: " + d5pt1(rules, updates, sortedUpdates));
    console.log("day5 pt2: " + d5pt2(rules, updates, sortedUpdates));

    function d5pt1(rules, updates, sortedUpdates) {
        const results = [];
        for (let i = 0; i < sortedUpdates.length; i++) {
            const su = sortedUpdates[i];
            const up = updates[i];
            let match = true;
            for (let j = 0; j < sortedUpdates[i].length; j++) {
                match = match && su[j] === up[j];
            }
            if (match) {
                results.push(middleValue(up));
            }
        }
        return sum(results)
    }

    function d5pt2(rules, updates, sortedUpdates) {
        const results = [];
        for (let i = 0; i < sortedUpdates.length; i++) {
            const su = sortedUpdates[i];
            const up = updates[i];
            let match = true;
            for (let j = 0; j < sortedUpdates[i].length; j++) {
                match = match && su[j] === up[j];
            }
            if (!match) {
                results.push(middleValue(su));
            }
        }
        return sum(results)
    }
}

function day6() {
        const data = read('d6.in');
        const grid = data.split('\n').map(line => line.split(''));
        console.log("day6 pt1: " + d6pt1(grid));
        console.log("day6 pt2: " + d6pt2(grid));

    function d6pt1(grid) {
        const visited = visit(grid);
        // console.log(markX(grid, visited));
        return visited.size;
    }

    function d6pt2(grid) {
        // TODO INCOMPLETE
        const loopPlace = visitLoops(grid);
        console.log(markO(grid, loopPlace));
        return loopPlace.size;
    }
}

function day7() {
    const data = read('d7.in');
    console.log("day7 pt1: " + sumOfTestValues(data, false));
    console.log("day7 pt2: " + sumOfTestValues(data, true));
}

function day8() {
    const data = read('d8med.in');
    console.log("day8 pt1: " + "TODO");
    console.log("day8 pt2: " + "TODO");
}

function day9() {
    const data = read('d9med.in');
    console.log("day9 pt1: " + "TODO");
    console.log("day9 pt2: " + "TODO");
}
