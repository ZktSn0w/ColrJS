/** @format */

import { ColrjsInit } from '../types';
import { Processor } from './Processor';

/**
 *
 * import { ColrJS } form "ColrJS"
 *
 * const colrjsInstance = new ColrJS({processors: {"firstProcessor": new customProcessorInstance}})
 *
 * const palette = colrjs.processors.forstProcessor.process()
 */

export class ColrJS<T extends Record<string, Processor>> {
    public processors: {
        [Property in keyof T]: T[Property];
    };

    constructor(init: ColrjsInit<T>) {
        this.processors = init.processors;
    }
}
