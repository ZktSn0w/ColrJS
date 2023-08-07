/** @format */

import { Processor } from '../Processor';
import { average } from '../../utils';
import { RGB, HSB } from '../../types';
import { hslToRgb } from '../Algorithms/hslToRgb';
import { rgbToHsl } from '../Algorithms/rgbToHSL';
import { Palette } from '../Palette';

export class Analogous extends Processor {
    constructor(public swatches: number = 5) {
        super();
    }

    get name() {
        return 'Analogous';
    }   

    private turnHue(hue: number, deg: number) {
        return Math.abs(hue - deg);
    }

    private toAnalogous(colors: HSB[]): HSB[] {
        let palette: HSB[] = [];
        colors.forEach((color)=>{
            const [hue, saturation, brightness] = color;
            palette.push([hue, saturation, brightness])
            palette.push([(this.turnHue(hue, 30)), saturation, brightness])
            palette.push([(this.turnHue(hue, -30)), saturation, brightness])
        })  
        palette = palette.slice(0, this.swatches);
        return palette;
    }

    process(pixelArray: RGB[]): Palette {
        const sortedKClusters = this.calculateKMeans(pixelArray, this.swatches).sort((a, b) => a.length - b.length);
        const rgbPalette: RGB[] = [...sortedKClusters].map((rgbArray) => {
            return [
                Math.round(average(rgbArray.map((pixel) => pixel[0]))),
                Math.round(average(rgbArray.map((pixel) => pixel[1]))),
                Math.round(average(rgbArray.map((pixel) => pixel[2]))),
            ];
        });

        const hsbPalette = rgbPalette.map((color) => rgbToHsl(color));
        const analogousPalette = this.toAnalogous(hsbPalette);

        return new Palette(
            this.name,
            analogousPalette.map((color) => hslToRgb(color))
        );
    }
}
