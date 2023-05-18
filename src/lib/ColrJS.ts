/** @format */

import { ColrInit, Extractor, RGB } from '../types';
import { Processor } from './Processor';

/**
 * @class
 * Implementation of the ColrJS color processor.
 * The Constructor is created with an Object containing `Processors`.
 * The created instance can be used to extract Palettes created by those
 * processors. ColrJS will create an async wrapper around the processing methods
 * to ensure non blocking operations.
 *
 * ---
 * @example
 *
 * ```ts
 * import {ColrJS, Monochromatic} from "colrjs";
 *
 * // Create the ColrJS instance and pass a new Monochromatic Processor
 * // configured to return 5 swatches
 * const colrs = new ColrJS({
 *      processors: {
 *          mono: new Monochromatic(5),
 *      }
 * })
 *
 * // Destructure the returned Palettes color methods
 * const { toRGB, toHSL } = await colrs.extractPalette(<pixelArray>).mono()
 *
 * ```
 */

export class ColrJS<T extends Record<PropertyKey, Processor>> {
    processors!: Record<PropertyKey, Processor>;
    constructor(init: ColrInit<T>) {
        this.processors = init.processors || {};
    }

    //@todo - add function documentation
    extractPalette(rgbPixelArray: RGB[]): Extractor<T> {
        return Object.fromEntries(
            Object.values(this.processors).map((processor) => {
                return [
                    processor.name,
                    () => {
                        return new Promise((res) => {
                            res(processor.process(rgbPixelArray));
                        });
                    },
                ];
            })
        ) as Extractor<T>;
    }
}
