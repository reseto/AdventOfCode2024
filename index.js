const { Command } = require('commander');
const fs = require('fs');
const program = new Command();

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

function day1() {
    try {
        const data = fs.readFileSync('d1.in', 'utf8');
        const rowPairs = parseRowDataToNumbers(data);
        const transposed = transposeMatrix(rowPairs);
        const sorted = transposed.map(sortRow);
        const differences = computeAbsoluteDifferences(sorted);
        console.log("day1 pt1 " + sumAbsoluteDifferences(differences));
        // part 2
        const occurrences = countOccurrences(sorted[1]);
        const multiplied = sorted[0].map(item => item * (occurrences[item] || 0));
        const reduce = multiplied.reduce((acc, num) => acc + num, 0);
        console.log("day1 pt2 " + reduce);
    } catch (err) {
        console.error(err);
    }
}
function parseRowDataToNumbers(data) {
    return data.split('\n').map(row =>
        row.split(/\s+/).map(Number)
    );
}
function transposeMatrix(matrix) {
    // if (matrix.length === 0) return [];
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex] || null));
}
function sortRow(row) {
    return row.sort((a, b) => a - b);
}
function computeAbsoluteDifferences(matrix) {
    if (matrix.length !== 2) {
        throw new Error('Matrix must have exactly 2 rows');
    }
    return matrix[0].map((item, index) => Math.abs(item - matrix[1][index]));
}
function sumAbsoluteDifferences(differences) {
    return differences.reduce((sum, value) => sum + value, 0);
}
function countOccurrences(sortedNumbers) {
    return sortedNumbers.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
    }, {});
}


function day2() {

}

