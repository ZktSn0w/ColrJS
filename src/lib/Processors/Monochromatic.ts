/** @format */

import { Processor } from '../Processor';
import { average } from '../../utils/';
import { RGB, HSB } from '../../types';
import { hslToRgb } from '../Algorithms/hslToRgb';
import { rgbToHsl } from '../Algorithms/rgbToHSL';
import { Palette } from '../Palette';

export class Monochromatic extends Processor {
    constructor(public swatches: number = 5) {
        super();
    }

    get name() {
        return 'Monochromatic';
    }

    private toMonochromatic(color: HSB): HSB {
        const [hue, saturation, lightness] = color;
        const maxStepSize = Math.min(lightness, 100 - lightness, saturation, 100 - saturation) / 2;

        return [hue, saturation, lightness];
    }

    process(pixelArray: RGB[]): Palette {
        const sortedKClusters = this.calculateKMeans(pixelArray, this.swatches).sort((a, b) => a.length - b.length);

        // average the clusters to create a one-dimensional array of colors
        // of a length equal to the number of swatches passed to the constructor
        const rgbPalette: RGB[] = [...sortedKClusters].map((rgbArray) => {
            return [
                average(rgbArray.map((pixel) => pixel[0])),
                average(rgbArray.map((pixel) => pixel[1])),
                average(rgbArray.map((pixel) => pixel[2])),
            ];
        });

        // convert to hsb to simplify monochromatic processing
        const hsbPalette = [...rgbPalette].map((color) => rgbToHsl(color));
        const monochromaticPalette = hsbPalette.map(this.toMonochromatic);
        const parsedColors = hsbPalette.map((colorArray) => {
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

        return new Palette(
            this.name,
            monochromaticPalette.map((color) => hslToRgb(color))
        );
    }
}
