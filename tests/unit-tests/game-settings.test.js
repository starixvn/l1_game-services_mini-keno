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

    describe("durations", () => {
        describe("KenoEast durations", () => {
            it("should match {43, 30, 5}", () => {
                // Act
                const settings = gameSettings.find((game) => game.name === "KenoEast");

                // Assert
                expect(settings.durations).toStrictEqual({
                    wholeRound: 43,
                    placingBets: 30,
                    lockingBet: 5,
                });
            });
        });

        describe("KenoMini durations", () => {
            it("should match {51, 40, 5}", () => {
                // Act
                const settings = gameSettings.find((game) => game.name === "KenoMini");

                // Assert
                expect(settings.durations).toStrictEqual({
                    wholeRound: 51,
                    placingBets: 40,
                    lockingBet: 5,
                });
            });
        });

        describe("KenoMini2 durations", () => {
            it("should match {41, 30, 5}", () => {
                // Act
                const settings = gameSettings.find((game) => game.name === "KenoMini2");

                // Assert
                expect(settings.durations).toStrictEqual({
                    wholeRound: 41,
                    placingBets: 30,
                    lockingBet: 5,
                });
            });
        });

        describe("KenoNorth durations", () => {
            it("should match {43, 30, 5}", () => {
                // Act
                const settings = gameSettings.find((game) => game.name === "KenoNorth");

                // Assert
                expect(settings.durations).toStrictEqual({
                    wholeRound: 43,
                    placingBets: 30,
                    lockingBet: 5,
                });
            });
        });

        describe("KenoSouth durations", () => {
            it("should match {43, 30, 5}", () => {
                // Act
                const settings = gameSettings.find((game) => game.name === "KenoSouth");

                // Assert
                expect(settings.durations).toStrictEqual({
                    wholeRound: 43,
                    placingBets: 30,
                    lockingBet: 5,
                });
            });
        });

        describe("KenoWest durations", () => {
            it("should match {43, 30, 5}", () => {
                // Act
                const settings = gameSettings.find((game) => game.name === "KenoWest");

                // Assert
                expect(settings.durations).toStrictEqual({
                    wholeRound: 43,
                    placingBets: 30,
                    lockingBet: 5,
                });
            });
        });

        describe("MegaKeno durations", () => {
            it("should match {58, 45, 5}", () => {
                // Act
                const settings = gameSettings.find((game) => game.name === "MegaKeno");

                // Assert
                expect(settings.durations).toStrictEqual({
                    wholeRound: 58,
                    placingBets: 45,
                    lockingBet: 5,
                });
            });
        });

        describe("MegaKeno2 durations", () => {
            it("should match {43, 30, 5}", () => {
                // Act
                const settings = gameSettings.find((game) => game.name === "MegaKeno2");

                // Assert
                expect(settings.durations).toStrictEqual({
                    wholeRound: 43,
                    placingBets: 30,
                    lockingBet: 5,
                });
            });
        });
    });
});
