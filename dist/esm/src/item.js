import Box from './box.js';
export var RotationType;
(function (RotationType) {
    RotationType[RotationType["whd"] = 0] = "whd";
    RotationType[RotationType["hwd"] = 1] = "hwd";
    RotationType[RotationType["hdw"] = 2] = "hdw";
    RotationType[RotationType["dhw"] = 3] = "dhw";
    RotationType[RotationType["dwh"] = 4] = "dwh";
    RotationType[RotationType["wdh"] = 5] = "wdh";
})(RotationType || (RotationType = {}));
export var Axis;
(function (Axis) {
    Axis[Axis["width"] = 0] = "width";
    Axis[Axis["height"] = 1] = "height";
    Axis[Axis["depth"] = 2] = "depth";
})(Axis || (Axis = {}));
export const StartPosition = [0, 0, 0];
export const RotationTypeStrings = {
    [RotationType.whd]: '(w, h, d)',
    [RotationType.hwd]: '(h, w, d)',
    [RotationType.hdw]: '(h, d, w)',
    [RotationType.dhw]: '(d, h, w)',
    [RotationType.dwh]: '(d, w, h)',
    [RotationType.wdh]: '(w, d, h)',
};
export default class Item extends Box {
    _allowedRotations = [
        RotationType.whd,
        RotationType.hwd,
        RotationType.hdw,
        RotationType.dhw,
        RotationType.dwh,
        RotationType.wdh,
    ];
    _rotationType = RotationType.whd;
    _position = []; // x, y, z
    constructor(name, w, h, d) {
        super(name, w, h, d);
    }
    get allowedRotations() {
        return this._allowedRotations;
    }
    get rotationType() {
        return this._rotationType;
    }
    set rotationType(type) {
        this._rotationType = type;
    }
    get position() {
        return this._position;
    }
    set position(position) {
        this._position = position;
    }
    get rotationTypeString() {
        return RotationTypeStrings[this._rotationType];
    }
    get dimension() {
        switch (this._rotationType) {
            case RotationType.whd:
                return [super.width, super.height, super.depth];
            case RotationType.hwd:
                return [super.height, super.width, super.depth];
            case RotationType.hdw:
                return [super.height, super.depth, super.width];
            case RotationType.dhw:
                return [super.depth, super.height, super.width];
            case RotationType.dwh:
                return [super.depth, super.width, super.height];
            case RotationType.wdh:
                return [super.width, super.depth, super.height];
        }
    }
    doesIntersect(other) {
        return rectIntersect(this, other, Axis.width, Axis.height) &&
            rectIntersect(this, other, Axis.height, Axis.depth) &&
            rectIntersect(this, other, Axis.width, Axis.depth);
    }
    toString() {
        return `Item: ${super.name} (${this.rotationTypeString} = ${this.dimension.join(' x ')})`;
    }
}
function rectIntersect(item1, item2, x, y) {
    const d1 = item1.dimension;
    const d2 = item2.dimension;
    const cx1 = item1.position[x] + d1[x] / 2;
    const cy1 = item1.position[y] + d1[y] / 2;
    const cx2 = item2.position[x] + d2[x] / 2;
    const cy2 = item2.position[y] + d2[y] / 2;
    const ix = Math.max(cx1, cx2) - Math.min(cx1, cx2);
    const iy = Math.max(cy1, cy2) - Math.min(cy1, cy2);
    return ix < (d1[x] + d2[x]) / 2 && iy < (d1[y] + d2[y]) / 2;
}
