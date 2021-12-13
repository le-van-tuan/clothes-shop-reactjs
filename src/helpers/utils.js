export const groupBy = (arr, criteria, inner) => {
    return arr.reduce(function (acc, currentValue) {
        if (!acc[currentValue[criteria]]) {
            acc[currentValue[criteria]] = [];
        }
        acc[currentValue[criteria]].push(inner ? currentValue[inner] : currentValue);
        return acc;
    }, {});
}