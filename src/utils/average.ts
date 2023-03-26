/** @format */

export function average(array: number[]) {

    const sumCount = array.reduce(
        (acc, curr) => ({ sum: acc.sum + curr, count: acc.count + 1 }),
        { sum: 0, count: 0 }
    );

    return (Math.round(sumCount.sum / sumCount.count));
}

