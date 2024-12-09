export {
    middleValue,
    topoSort,
    parseData
}

function parseData(data) {
    const [rulesSection, updatesSection] = data.split('\n\n');

    const rules = rulesSection.split('\n').map(line =>
        line.split('|').map(Number)
    );

    const updates = updatesSection.split('\n').map(line =>
        line.split(',').map(Number)
    );

    return { rules, updates };
}


function middleValue(arr) {
    const middleIndex = Math.floor(arr.length / 2);
    return arr[middleIndex];
}

function topoSort(array, rules) {
    const graph = new Map();
    const inDegree = new Map();

    array.forEach(num => {
        graph.set(num, []);
        inDegree.set(num, 0);
    });

    rules.forEach(([pre, post]) => {
        if (graph.has(pre) && graph.has(post)) {
            graph.get(pre).push(post);
            inDegree.set(post, inDegree.get(post) + 1);
        }
    });

    const queue = [];
    inDegree.forEach((degree, num) => {
        if (degree === 0) queue.push(num);
    });

    const sorted = [];
    while (queue.length > 0) {
        const num = queue.shift();
        sorted.push(num);
        graph.get(num).forEach(neighbor => {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) queue.push(neighbor);
        });
    }

    return sorted;
}
