import { generateRawResultForHash } from "../../src/result-helper";

describe("generateRawResultForHash test", () => {
    it("should return total points", () => {
        // arrange
        const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        // act
        const actual = generateRawResultForHash(result);

        // assert
        expect(actual).toEqual("{55}");
    });
});
