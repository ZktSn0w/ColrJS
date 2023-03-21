/** @format */

import { Palette, RGBa } from '../types';

/***
 * @description The Class a Processor has to extend to pass the Typecheck
 *
 * @example ```ts
 * import {Processor} from "colrjs/Processor"
 * import type palette from colrjs/Palette
 *
 * class myProcessor extends Processor {
 *  override process(pixelArray: RGBa[]): Palette {
 *      // do something
 *  }
 * }
 *
 * ```
 */
export abstract class Processor {
    constructor() {}
    process(pixelArray: RGBa[]): Palette {
        throw 'Warn! ColrJS: please override the process method to implement processing logic';
    }
}
