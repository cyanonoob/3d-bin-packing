import Box from './box.js';
export declare enum RotationType {
    whd = 0,
    hwd = 1,
    hdw = 2,
    dhw = 3,
    dwh = 4,
    wdh = 5
}
export declare enum Axis {
    width = 0,
    height = 1,
    depth = 2
}
export declare const StartPosition: number[];
export declare const RotationTypeStrings: Record<RotationType, string>;
export default class Item extends Box {
    private _allowedRotations;
    private _rotationType;
    private _position;
    constructor(name: string, w: number, h: number, d: number);
    get allowedRotations(): RotationType[];
    get rotationType(): RotationType;
    set rotationType(type: RotationType);
    get position(): number[];
    set position(position: number[]);
    get rotationTypeString(): string;
    get dimension(): number[];
    doesIntersect(other: Item): boolean;
    toString(): string;
}
//# sourceMappingURL=item.d.ts.map