export {
    findStartingPosition,
    visit,
    markX,
    iterateRight,
    visitLoops,
    markO
}

const directions = ['up', 'right', 'down', 'left'];
const moves = {
    'up': [-1, 0],
    'right': [0, 1],
    'down': [1, 0],
    'left': [0, -1]
};

function findStartingPosition(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '^') {
                return [i,j];
            }
        }
    }
    return [0,0];
}

function visit(grid) {
    let [ x, y ] = findStartingPosition(grid);
    let directionIndex = 0;
    const visited = new Set();
    visited.add(`${x},${y}`);

    while (true) {
        const [dx, dy] = moves[directions[directionIndex]];
        const newX = x + dx;
        const newY = y + dy;

        if (newX < 0 || newY < 0 || newX >= grid.length || newY >= grid[0].length) {
            break;
        }

        if (grid[newX][newY] === '.') {
            x = newX;
            y = newY;
            visited.add(`${x},${y}`);
        } else {
            directionIndex = (directionIndex + 1) % 4;
        }
    }
    return visited;
}

function markX(grid, visited) {
    visited.forEach(coord => {
        const [i, j] = coord.split(',').map(Number);
        grid[i][j] = 'X';
    });

    return grid.map(line => line.join('')).join('\n');
}

function iterateRight(grid, startX, startY, direction) {
    const rightDirection = (directionIndex) => (directionIndex + 1) % 4;
    let directionIndex = directions.indexOf(direction);
    let [dx, dy] = moves[directions[rightDirection(directionIndex)]];

    let x = startX;
    let y = startY;
    const coordinates = [];

    while (true) {
        x += dx;
        y += dy;

        if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length || grid[x][y] === '#') {
            break;
        }

        coordinates.push([x, y]);
    }

    return coordinates;
}


function visitLoops(grid) {
    const directions = ['up', 'right', 'down', 'left'];
    const moves = {
        'up': [-1, 0],
        'right': [0, 1],
        'down': [1, 0],
        'left': [0, -1]
    };

    let [x, y] = findStartingPosition(grid);
    let directionIndex = 0;
    const visited = new Set();
    const visitedWithDirection = new Set();
    const loopPlace = new Set();
    visited.add(`${x},${y}`);
    visitedWithDirection.add(`${x},${y},${directionIndex}`);

    while (true) {
        const [dx, dy] = moves[directions[directionIndex]];
        const newX = x + dx;
        const newY = y + dy;

        if (newX < 0 || newY < 0 || newX >= grid.length || newY >= grid[0].length) {
            break;
        }

        if (grid[newX][newY] === '.') {
            x = newX;
            y = newY;
            const rightDirection = (directionIndex) => (directionIndex + 1) % 4;
            for (const coord of iterateRight(grid, x, y, directions[directionIndex])) {
                const [cx, cy] = coord;
                if (visitedWithDirection.has(`${cx},${cy},${rightDirection(directionIndex)}`)) {
                    loopPlace.add(`${x+dx},${y+dy}`);
                }
            }
            if (visitedWithDirection.has(`${x},${y},${directionIndex}`)) {
                loopPlace.add(`${x},${y}`);
            }
            visited.add(`${x},${y}`);
            visitedWithDirection.add(`${x},${y},${directionIndex}`);
        } else {
            directionIndex = (directionIndex + 1) % 4;
        }
    }
    return loopPlace;
}

function markO(grid, loopPlace) {
    loopPlace.forEach(coord => {
        const [i, j] = coord.split(',').map(Number);
        grid[i][j] = 'O';
    });

    return grid.map(line => line.join('')).join('\n');
}
