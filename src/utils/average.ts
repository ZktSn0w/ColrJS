/** @format */

export const average = <T extends number>(arr: T[]) => arr.reduce((a, c) => a + c, 0) / arr.length;
