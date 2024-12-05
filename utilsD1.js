import fs from "fs";

function read(file) {
    return fs.readFileSync(file, 'utf8');
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

function sum(numbers) {
    return numbers.reduce((sum, value) => sum + value, 0);
}

function countOccurrences(sortedNumbers) {
    return sortedNumbers.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
    }, {});
}
export {
    read,
    parseRowDataToNumbers,
    transposeMatrix,
    sortRow,
    computeAbsoluteDifferences,
    sum,
    countOccurrences
}
// module.exports = {
//     read,
//     parseRowDataToNumbers,
//     transposeMatrix,
//     sortRow,
//     computeAbsoluteDifferences,
//     sumAbsoluteDifferences,
//     countOccurrences
// }