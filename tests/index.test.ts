import { trueFn } from "../src";

describe("ts-seed", () => {
    test("should pass", () => {
        expect(trueFn()).toBe(true);
    });
});
