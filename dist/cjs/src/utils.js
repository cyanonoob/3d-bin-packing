"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factoredInteger = void 0;
/**
 * Precision to retain in factoredInteger()
 */
const FACTOR = 5;
/**
 * Factor a number by FACTOR and round to the nearest whole number
 */
const factoredInteger = (value) => (Math.round(value * (Math.pow(10, FACTOR))));
exports.factoredInteger = factoredInteger;
