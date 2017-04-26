import { type } from "app.js";

describe("The isString function ", () => {
    test("throws an error if the input value is not a string.", () => {
        const data1 = undefined;
        const data2 = null;
        const data3 = 1;
        const data4 = [];
        const data5 = {};

        expect(type.isString(data1)).toBe(false);
        expect(type.isString(data2)).toBe(false);
        expect(type.isString(data3)).toBe(false);
        expect(type.isString(data4)).toBe(false);
        expect(type.isString(data5)).toBe(false);
    });

    test("returns true if the input value is a string.", () => {
        const data = "is_string";
        expect(type.isString(data)).toBe(true);
    });
});
