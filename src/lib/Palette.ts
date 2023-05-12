/** @format */

import { RGB, HSB } from '../types';

import { rgbToHsl } from './Algorithms/rgbToHSL';

export class Palette {
    constructor(public name: string, private extractedColors: RGB[]) {}

    toRGB(): RGB[] {
        return this.extractedColors;
    }
    toHSL(): HSB[] {
        return this.extractedColors.map((color) => rgbToHsl(color));
    }
}
