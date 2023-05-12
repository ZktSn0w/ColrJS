/** @format */

import { Processor } from '.';
import { ColrInit } from '../types';

const defaultConfig = {};

export const defineConfig = <T extends Record<PropertyKey, Processor>>(props: Partial<ColrInit<T>>): ColrInit<T> => {
    return {
        ...defaultConfig,
        ...props,
    };
};
