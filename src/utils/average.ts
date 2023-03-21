/** @format */

export function average(array: number[]) {
    let arrayLength = array.length;
    let sumOfItems = 0;

    array.forEach((i) => (sumOfItems = sumOfItems + i));
    return Math.round(sumOfItems / arrayLength);
}
