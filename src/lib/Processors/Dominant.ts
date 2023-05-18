/** @format */

import {Palette, Processor} from '..';
import {RGB} from '../../types';
import {average} from '../../utils/average';

export class Dominant extends Processor {
    constructor(public swatches: number = 5) {
        super();
    }

    get name() {
        return 'Dominant';
    }

    process(pixelArray: RGB[]): Palette {
        const sortedKClusters = this.calculateKMeans(pixelArray, this.swatches).sort((a, b) => a.length - b.length);
        const rgbPalette: RGB[] = [...sortedKClusters].map((rgbArray) => {
            return [
                average(rgbArray.map((pixel) => pixel[0])),
                average(rgbArray.map((pixel) => pixel[1])),
                average(rgbArray.map((pixel) => pixel[2])),
            ];
        });

        return new Palette(
            this.name,
            rgbPalette
        );
    }
}
