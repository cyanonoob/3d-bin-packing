import Bin from './bin.js';
import Item from './item.js';
export default class Packer {
    private _bins;
    private _items;
    private _unfitItems;
    get bins(): Bin[];
    get items(): Item[];
    get unfitItems(): Item[];
    addBin(bin: Bin): void;
    addItem(item: Item): void;
    private findFittedBin;
    private getBiggerBinThan;
    private unfitItem;
    private packToBin;
    pack(): void;
}
//# sourceMappingURL=packer.d.ts.map