/** @format */

import {Palette, Processor} from '..';
import {RGB} from '../../types';
import {average} from '../../utils/average';

export class Complementary extends Processor {
    constructor(public swatches: number = 5) {
        super();
    }

    get name() {
        return 'Complementary';
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

        return new Palette(
            this.name,
            rgbPalette.map(([r, g, b]) => [255 - r, 255 - g, 255 - b])
        );
    }
}
