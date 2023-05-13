/** @format */

import { RGB } from '../types';
import { kMeans } from './Algorithms/kMeans';
import { Palette } from './Palette';

export abstract class Processor {
    public abstract readonly name: string;
    public abstract process(pixelArray: RGB[]): Palette;

    calculateKMeans(pixelArray: RGB[], k: number) {
        return kMeans(pixelArray, k);
    }
}
