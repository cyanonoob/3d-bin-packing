import { StartPosition, Axis, } from './item.js';
export default class Packer {
    _bins = [];
    _items = [];
    _unfitItems = [];
    get bins() {
        return this._bins;
    }
    get items() {
        return this._items;
    }
    get unfitItems() {
        return this._unfitItems;
    }
    addBin(bin) {
        this._bins.push(bin);
    }
    addItem(item) {
        this._items.push(item);
    }
    findFittedBin(i) {
        for (const bin of this._bins) {
            if (!bin.putItem(i, StartPosition)) {
                continue;
            }
            if (bin.items.length === 1 && bin.items[0] === i) {
                bin.items = [];
            }
            return bin;
        }
    }
    getBiggerBinThan(otherBin) {
        return this._bins.find((b) => b.volume > otherBin.volume);
    }
    unfitItem() {
        if (this.items.length === 0) {
            return;
        }
        this.unfitItems.push(this.items.shift());
    }
    packToBin(b, items) {
        let b2 = undefined;
        const unpacked = [];
        const fit = b.putItem(items[0], StartPosition);
        if (!fit) {
            const b2 = this.getBiggerBinThan(b);
            if (b2) {
                return this.packToBin(b2, items);
            }
            return this.items;
        }
        // Pack unpacked items.
        for (const item of this.items.slice(1)) {
            let fitted = false;
            // Try available pivots in current bin that are not intersect with
            // existing items in current bin.
            lookup: for (const axis of [Axis.width, Axis.height, Axis.depth]) {
                for (const itemB of b.items) {
                    let itemPosition;
                    switch (axis) {
                        case Axis.width:
                            itemPosition = [itemB.position[0] + itemB.dimension[0], itemB.position[1], itemB.position[2]];
                            break;
                        case Axis.height:
                            itemPosition = [itemB.position[0], itemB.position[1] + itemB.dimension[1], itemB.position[2]];
                            break;
                        case Axis.depth:
                            itemPosition = [itemB.position[0], itemB.position[1], itemB.position[2] + itemB.dimension[2]];
                            break;
                    }
                    if (b.putItem(item, itemPosition)) {
                        fitted = true;
                        break lookup;
                    }
                }
            }
            if (!fitted) {
                while (b2 !== undefined) {
                    b2 = this.getBiggerBinThan(b);
                    if (b2) {
                        b2.items.push(item);
                        const left = this.packToBin(b2, b2.items);
                        if (left.length === 0) {
                            b = b2;
                            fitted = true;
                            break;
                        }
                    }
                }
                if (!fitted) {
                    unpacked.push(item);
                }
            }
        }
        return unpacked;
    }
    pack() {
        // Sort bins smallest to largest.
        this.bins.sort((a, b) => a.volume - b.volume);
        // Sort items largest to smallest.
        this.items.sort((a, b) => b.volume - a.volume);
        while (this.items.length > 0) {
            const bin = this.findFittedBin(this.items[0]);
            if (!bin) {
                this.unfitItem();
                continue;
            }
            this._items = this.packToBin(bin, this.items);
        }
    }
}
