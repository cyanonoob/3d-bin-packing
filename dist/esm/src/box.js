import { factoredInteger } from './utils.js';
export default class Box {
    _name;
    _width;
    _height;
    _depth;
    constructor(name, w, h, d) {
        this._name = name;
        this._width = factoredInteger(w);
        this._height = factoredInteger(h);
        this._depth = factoredInteger(d);
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
