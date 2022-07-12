import gameSettings from "../../src/game-settings";

jest.mock("../../src/shuffleNumbers", () => {
    return function (min, max) {
        return `${min}_${max}`;
    };
});

describe("game-settings", () => {
    describe("generateResult", () => {
        it("should call generateResult with correct param", async () => {
            // arrange
            const expectedValue = [
                "KenoEast_20_80",
                "KenoMax_20_80",
                "KenoMax2_20_80",
                "KenoMini_10_40",
                "KenoMini2_10_40",
                "KenoNorth_20_80",
                "KenoSouth_20_80",
                "KenoWest_20_80",
                "MegaKeno_20_80",
                "MegaKeno2_20_80",
            ];

            // act
            const actualValue = gameSettings.map((game) => {
                return `${game.name}_${game.generateResult()}`;
            });

            //assert
            expect(actualValue).toStrictEqual(expectedValue);
        });
    });
});
