/** @format */

import { RGBa } from '../types/';

export const colorPresence = (pixelArray: RGBa[]) => {
    const collectedColors: Record<string, number[][]> = {};

    for (let i = 0; i < pixelArray.length; i++) {
        const [r, g, b] = pixelArray[i];
        const key = `${r}-${g}-${b}`;
        if (!collectedColors[key]) collectedColors[key] = [pixelArray[i]];
        collectedColors[key] = [...collectedColors[key], pixelArray[i]];
    }

    return collectedColors;
};
