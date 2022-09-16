import gameSettings from "../../src/game-settings";

jest.mock("../../src/shuffleNumbers", () => {
    return function (randomMode, min, max) {
        return `${randomMode || 1}_${min}_${max}`;
    };
});

describe("game-settings", () => {
    describe("generateResult", () => {
        it("should call generateResult with correct param", async () => {
            // arrange
            const expectedValue = [
                "KenoEast_1_20_80",
                "KenoMini_1_10_40",
                "KenoMini2_1_10_40",
                "KenoNorth_1_20_80",
                "KenoSouth_1_20_80",
                "KenoWest_1_20_80",
                "MegaKeno_1_20_80",
                "MegaKeno2_1_20_80",
            ];

            // act
            const actualValue = gameSettings.map((game) => {
                return `${game.name}_${game.generateResult(1)}`;
            });

            //assert
            expect(actualValue).toStrictEqual(expectedValue);
        });
    });
});
