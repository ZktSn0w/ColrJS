/** @format */

import { Processor } from '../lib';

export type ColrInit<T extends Record<PropertyKey, Processor>> = {
    processors?: {
        [ProcessorName in keyof T]: T[ProcessorName];
    };
};
