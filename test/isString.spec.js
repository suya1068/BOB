const isString = require("../src/isString");

// Give, When, Then
// The isString function throws an error if the input value is not a string.
describe("The isString function ", () => {
    test("throws an error if the input value is not a string.", () => {
        const data1 = undefined;
        const data2 = null;
        const data3 = 1;
        const data4 = [];
        const data5 = {};

        expect(isString(data1)).toBe(false);
        expect(isString(data2)).toBe(false);
        expect(isString(data3)).toBe(false);
        expect(isString(data4)).toBe(false);
        expect(isString(data5)).toBe(false);
    });

    test("returns true if the input value is a string.", () => {
        const data = "is_string";
        expect(isString(data)).toBe(true);
    });
});