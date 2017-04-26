import { type } from "app.js";


describe("The isDate function ", () => {
    test("throws an error if the input value is not a date.", () => {
        const data1 = undefined;
        const data2 = null;
        const data3 = {};
        const data4 = "";
        const data5 = [];

        expect(type.isDate(data1)).toBe(false);
        expect(type.isDate(data2)).toBe(false);
        expect(type.isDate(data3)).toBe(false);
        expect(type.isDate(data4)).toBe(false);
        expect(type.isDate(data5)).toBe(false);
    });

    test("returns true if the input value is a date.", () => {
        const data = new Date();
        expect(type.isDate(data)).toBe(true);
    });
});
