/** @format */

import { Processor } from '../Processor';
import { Palette, RGBa } from '../../types';
import { hslToRgb, rgbToHsl } from '../../utils';
import { average } from '../../utils/average';
import { kMeans } from '../../utils/kMeans';

export class MonochromaticProcessor extends Processor {
    override process(pixelArray: RGBa[]): Palette {
        const k = kMeans(pixelArray, 3).sort((a, b) => a.length - b.length);

        const hslColors: [number, number, number][] = [];
        const palette: Palette = {
            colors: [[], [], []],
        };
        let rgbPalette: [number, number, number][] = [];
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
        rgbPalette.forEach((i) => {
            hslColors.push(rgbToHsl(i));
        });

        const parsedColors = hslColors.map((colorArray) => {
            let [hue, saturation, lightness] = colorArray;
            let monochromaticColorArray = [];
            let max_step_size = Math.min(lightness, 100 - lightness, saturation, 100 - saturation) / 2;

            for (let i = -2; i < 3; i++) {
                let new_lightness = lightness + i * max_step_size;
                new_lightness = Math.max(0, Math.min(100, new_lightness));

                let new_saturation = saturation + i * max_step_size;
                new_saturation = Math.max(0, Math.min(100, new_saturation));

                monochromaticColorArray.push([hue, new_saturation, new_lightness]);
            }

            return monochromaticColorArray;
        });
        parsedColors.forEach((i) => {
            i.forEach((j) => {
                parsedColors[parsedColors.indexOf(i)][i.indexOf(j)] = hslToRgb(j);
            });
        });

        parsedColors.map((i) => {
            i.sort((a, b) => {
                return a[2] - b[2];
            });
        });

        palette.colors = parsedColors.flat();

        return palette;
    }
}
