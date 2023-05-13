/** @format */

import { Palette, Processor } from '../lib';

export type Extractor<T extends Record<string, Processor>> = {
    [P in keyof T]: () => Promise<Palette>;
};
