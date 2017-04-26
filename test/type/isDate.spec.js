import { type } from "app.js";

describe("The isDate function ", () => {
    test("throws an error if the input value is not a Date.", () => {
        const data1 = undefined;
        const data2 = null;
        const data3 = 1;
        const data4 = "asds";
        const data5 = [];
        const data6 = {};

        expect(type.isDate(data1)).toBe(false);
        expect(type.isDate(data2)).toBe(false);
        expect(type.isDate(data3)).toBe(false);
        expect(type.isDate(data4)).toBe(false);
        expect(type.isDate(data5)).toBe(false);
        expect(type.isDate(data6)).toBe(false);
    })

    test("", () => {
        const data = new Date;
        expect(type.isDate(data)).toBe(true)
    })
})