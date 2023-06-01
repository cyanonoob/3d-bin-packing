"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("./utils.js");
class Box {
    constructor(name, w, h, d) {
        this._name = name;
        this._width = (0, utils_js_1.factoredInteger)(w);
        this._height = (0, utils_js_1.factoredInteger)(h);
        this._depth = (0, utils_js_1.factoredInteger)(d);
    }
    get name() {
        return this._name;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get depth() {
        return this._depth;
    }
    get volume() {
        return this._width * this._height * this._depth;
    }
}
exports.default = Box;
