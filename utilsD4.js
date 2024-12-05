
function countWordOccurrences(grid, word) {
    const directions = [
        [0, 1], [1, 0], [1, 1], [1, -1], // right, down, down-right, down-left
        [0, -1], [-1, 0], [-1, -1], [-1, 1] // left, up, up-left, up-right
    ];
    let count = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            directions.forEach(([dx, dy]) => {
                if (checkWord(grid, word, row, col, dx, dy)) {
                    count++;
                }
            });
        }
    }
    return count;
}

function checkWord(grid, word, row, col, dx, dy) {
    for (let i = 0; i < word.length; i++) {
        const x = row + i * dx;
        const y = col + i * dy;
        if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length || grid[x][y] !== word[i]) {
            return false;
        }
    }
    return true;
}

function findPattern(grid) {
    const patterns = [
        [
            ['M', '.', 'S'],
            ['.', 'A', '.'],
            ['M', '.', 'S']
        ],
        [
            ['S', '.', 'S'],
            ['.', 'A', '.'],
            ['M', '.', 'M']
        ],
        [
            ['S', '.', 'M'],
            ['.', 'A', '.'],
            ['S', '.', 'M']
        ],
        [
            ['M', '.', 'M'],
            ['.', 'A', '.'],
            ['S', '.', 'S']
        ]
    ];
    const patternHeight = patterns[0].length;
    const patternWidth = patterns[0][0].length;
    let count = 0;

    for (let row = 0; row <= grid.length - patternHeight; row++) {
        for (let col = 0; col <= grid[0].length - patternWidth; col++) {
            patterns.forEach(pattern => {
                if (matchesPattern(grid, pattern, row, col)) {
                    count++;
                }
            });
        }
    }
    return count;
}

function matchesPattern(grid, pattern, startRow, startCol) {
    for (let row = 0; row < pattern.length; row++) {
        for (let col = 0; col < pattern[row].length; col++) {
            if (pattern[row][col] !== '.' && grid[startRow + row][startCol + col] !== pattern[row][col]) {
                return false;
            }
        }
    }
    return true;
}

export {
    countWordOccurrences,
    checkWord,
    findPattern
}