const { Command } = require('commander');
const program = new Command();
const { read, parseRowDataToNumbers, transposeMatrix, sortRow, computeAbsoluteDifferences, sum, countOccurrences } = require('./utilsD1');
const { isStrictlyMonotonic, checkIfAnyStrictlyMonotonic, produceArraysWithoutCurrentItem } = require('./utilsD2');
const { countWordOccurrences, findPattern } = require('./utilsD4');

// Run the program with the following command:
// node index.js -d 1

program
  .version('1.0.0')
  .description('A simple CLI for Advent of Code 2024')
  .option('-e, --debug', 'output extra debugging')
  .option('-d, --day <type>', 'specify day to run');

program.parse(process.argv);

const options = program.opts();
if (options.debug) console.log(options);
if (options.day) console.log(`Starting day ${options.day}!`);
if (options.day === '1') day1();
if (options.day === '2') day2();
if (options.day === '3') day3();
if (options.day === '4') day4();
if (options.day === '5') day5();
// if (options.day === '6') day6();
// if (options.day === '7') day7();

function day1() {
    try {
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
    } catch (err) {
        console.error(err);
    }
}

function day2() {
    try {
        const data = read('d2.in');
        const rows = parseRowDataToNumbers(data);
        // part 1
        console.log("day2 pt1 " + rows.reduce((count, row) => {
            return count + (isStrictlyMonotonic(row) ? 1 : 0);
        }, 0));
        // part 2
        console.log("day2 pt2 " + rows.reduce((count, row) => {
            return count + (checkIfAnyStrictlyMonotonic(row) ? 1 : 0);
        }, 0));

    } catch (err) {
        console.error(err);
    }
}

function day3() {
    try {
        const data = read('d3.in');
        console.log("day3 pt1: " + d3pt1(data));
        console.log("day3 pt2: " + d3pt2(data));
    } catch (err) {
        console.error(err);
    }

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
    try {
        const data = read('d4.in');
        console.log("day4 pt1: " + d4pt1(data));
        console.log("day4 pt2: " + d4pt2(data));
    } catch (err) {
        console.error(err);
    }

    function d4pt1(data) {
        const grid = data.split('\n').map(line => line.split(''));
        const word = 'XMAS';
        return countWordOccurrences(grid, word);
    }

    function d4pt2(data) {
        const grid = data.split('\n').map(line => line.split(''));
        return findPattern(grid);
    }
}

function day5() {
    try {
        const data = read('d5_small.in');
        console.log("day5 pt1: " + d5pt1(data));
        console.log("day5 pt2: " + d5pt2(data));
    } catch (err) {
        console.error(err);
    }

    function d5pt1(data) {
        return "";
    }

    function d5pt2(data) {
        return "";
    }
}