/** @format */

import { Processor } from '..';
import { RGBa, Palette } from '../../types';
import { average } from '../../utils/average';
import { kMeans } from '../../utils/kMeans';

export class Complementary extends Processor {
    override process(pixelArray: RGBa[]): Palette {
        const k = kMeans(pixelArray, 3).sort((a, b) => a.length - b.length);
        let rgbPalette: [number, number, number][] = [];
        const palette: Palette = {
            colors: [],
        };

        k.sort(function (a, b) {
            return b.length - a.length;
        });

        k.forEach((pixelCollection) => {
            let r: number[] = [];
            let g: number[] = [];
            let b: number[] = [];
            pixelCollection.forEach((arrayOfPixels) => {
                r.push(arrayOfPixels[0]);
                g.push(arrayOfPixels[1]);
                b.push(arrayOfPixels[2]);
            });
            rgbPalette.push([average(r), average(g), average(b)]);
        });

        rgbPalette.forEach((color) => {
            let [r, g, b] = color;
            palette.colors.push([r, g, b], [255 - r, 255 - g, 255 - b]);
        });

        return palette;
    }
}
