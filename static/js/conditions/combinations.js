function combinations(set, list, n, k, allList) {
    if (k == 0) {
        allList.push(list);
        return list;
    } else {
        for (var i = 0; i < n; i++) {
            let newList = Object.assign([], list);
            newList.push(set[i]);
            combinations(set, newList, n, k - 1, allList);
        }
    }
}

function getCombinations(perm, k) {
    var allList = [];
    combinations(perm, [], perm.length, k, allList);
    for (var i in allList) {
        allList[i] = getCumSum(allList[i]);
    }
    return allList;
}

function getCumSum(element) {
    const cumulativeSum = (sum => value => sum += value)(0);
    return element.map(cumulativeSum);
}