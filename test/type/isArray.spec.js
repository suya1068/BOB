import { type } from "app.js";

describe("The isArrat function ", () => {
    test("throws an error if the input value is not a Array.", () => {
        const data1 = undefined;
        const data2 = null;
        const data3 = 1;
        const data4 = '';
        const data5 = {};

        expect(type.isArray(data1)).toBe(false);
        expect(type.isArray(data2)).toBe(false);
        expect(type.isArray(data3)).toBe(false);
        expect(type.isArray(data4)).toBe(false);
        expect(type.isArray(data5)).toBe(false);
    });
    
    test("eturns true if the input value is a Array.", () => {
        const data = [1, 2, "asdasd", 4, {a: 2}];
        expect(type.isArray(data)).toBe(true);
    })
})