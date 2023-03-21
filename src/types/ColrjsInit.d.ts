/** @format */

import { Processor } from '../lib/Processor';

export type ColrjsInit<T extends Record<string, Processor>> = {
    processors: {
        [Property in keyof T]: T[Property];
    };
};
