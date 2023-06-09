import { Bin, Item, Packer } from '../index.js';
const testDatas = [
    {
        name: 'Edge case that needs rotation.',
        bins: [
            new Bin('Le grande box', 100, 100, 300),
        ],
        items: [
            new Item('Item 1', 150, 50, 50)
        ],
        expectation: (packer) => packer.bins[0].items.length === 1 && packer.unfitItems.length === 0,
    },
    {
        name: 'Edge case with only rotation 3 and 0 enabled.',
        bins: [
            new Bin('Le grande box', 100, 100, 300),
        ],
        items: [
            new Item('Item 1', 150, 50, 50)
        ],
        expectation: (packer) => packer.bins[0].items.length === 1 && packer.unfitItems.length === 0,
    },
    {
        name: 'Test three items fit into smaller bin after being rotated.',
        bins: [
            new Bin("1. Le petite box", 296, 296, 8),
            new Bin("2. Le grande box", 2960, 2960, 80),
        ],
        items: [
            new Item("Item 1", 250, 250, 2),
            new Item("Item 2", 250, 2, 250),
            new Item("Item 3", 2, 250, 250),
        ],
        expectation: (packer) => packer.bins[0].name === '1. Le petite box'
            && packer.bins[0].items.length === 3
            && packer.bins[1].items.length === 0
            && packer.unfitItems.length === 0,
    },
    {
        name: 'Test three items fit into larger bin.',
        bins: [
            new Bin("1. Le petite box", 296, 296, 8),
            new Bin("2. Le grande box", 2960, 2960, 80),
        ],
        items: [
            new Item("Item 1", 2500, 2500, 20),
            new Item("Item 2", 2500, 2500, 20),
            new Item("Item 3", 2500, 2500, 20),
        ],
        expectation: (packer) => packer.bins[0].name === '1. Le petite box'
            && packer.bins[0].items.length === 0
            && packer.bins[1].items.length === 3
            && packer.unfitItems.length === 0,
    },
    {
        name: '1 bin with 7 items fit into.',
        bins: [
            new Bin("Bin 1", 220, 160, 100),
        ],
        items: [
            new Item("Item 1", 20, 100, 30),
            new Item("Item 2", 100, 20, 30),
            new Item("Item 3", 20, 100, 30),
            new Item("Item 4", 100, 20, 30),
            new Item("Item 5", 100, 20, 30),
            new Item("Item 6", 100, 100, 30),
            new Item("Item 7", 100, 100, 30),
        ],
        expectation: (packer) => packer.bins[0].items.length === 7 && packer.unfitItems.length === 0,
    },
    {
        name: 'Big item is packed first.',
        bins: [
            new Bin("Bin 1", 100, 100, 100),
        ],
        items: [
            new Item("Item 1", 50, 100, 100),
            new Item("Item 2", 100, 100, 100),
            new Item("Item 3", 50, 100, 100),
        ],
        expectation: (packer) => packer.bins[0].items.length === 1 && packer.unfitItems.length === 2,
    },
    {
        name: 'Larger items are tried first.',
        bins: [
            new Bin("Small Bin", 50, 100, 100),
            new Bin("Bigger Bin", 150, 100, 100),
            new Bin("Small Bin", 50, 100, 100),
        ],
        items: [
            new Item("Item 1 Small", 50, 100, 100),
            new Item("Item 3 Small", 50, 100, 100),
            new Item("Item 3 Small", 50, 100, 100),
            new Item("Item 2 Big", 100, 100, 100),
        ],
        expectation: (packer) => 
        // Big bin should have big item and 1 small item
        // Small bins should have 1 small item
        packer.bins[2].name === 'Bigger Bin'
            && packer.bins[2].items.length === 2
            && packer.bins[0].name === 'Small Bin'
            && packer.bins[0].items.length === 1
            && packer.unfitItems.length === 0,
    },
    {
        name: 'First item fits without rotation but needs to be rotated to fit all items.',
        bins: [
            new Bin('USPS Medium Flat Rate Box (Top Loading)', 11, 8.5, 5.5),
        ],
        items: [
            new Item('Item 1', 8.1, 5.2, 2.2),
            new Item('Item 2', 8.1, 5.2, 3.3),
        ],
        expectation: (packer) => packer.bins[0].items.length === 2 && packer.unfitItems.length === 0,
    },
    {
        // https://github.com/Automattic/woocommerce-services/issues/1293
        name: 'Floating point arithmetic is handled correctly.',
        bins: [
            new Bin("Bin 1", 12, 12, 5.5),
        ],
        items: [
            new Item("Item 1", 12, 12, .005),
            new Item("Item 2", 12, 12, .005),
        ],
        expectation: (packer) => packer.bins[0].items.length === 2 && packer.unfitItems.length === 0,
    }
];
describe('Packer', () => {
    testDatas.forEach((testData) => {
        it(testData.name, () => {
            const packer = new Packer();
            testData.bins.forEach((bin) => {
                packer.addBin(bin);
            });
            testData.items.forEach((item) => {
                packer.addItem(item);
            });
            packer.pack();
            expect(testData.expectation(packer)).toBe(true);
        });
    });
});
