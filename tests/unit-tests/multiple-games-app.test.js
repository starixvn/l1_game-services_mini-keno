import MultipleGamesApp from "../../src/multiple-games-app";

describe("multiple-games-app", () => {
    describe("startGames", () => {
        it("should start each game", async () => {
            // arrange
            const appSettings = {};
            const app = new MultipleGamesApp("game-service", appSettings);
            const definitions = [{ durations: { wholeRound: 20 }, repositories: {} }];
            const numberOfCalls = 1;
            spyOn(app, "startGame");

            // act
            await app.startGames(definitions);

            //assert
            expect(app.startGame).toBeCalledTimes(numberOfCalls);
        });
    });
});
