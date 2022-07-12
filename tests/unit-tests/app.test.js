import { run } from "../../src/app";

const mAppStatus = {
    started: false,
};

jest.mock("../../src/multiple-games-app", () => {
    const mApp = {
        run: () => {},
        startGames: () => {
            mAppStatus.started = true;
        },
    };

    return function () {
        return mApp;
    };
});

describe("app", () => {
    describe("run", () => {
        it("should startGames", async () => {
            // arrange
            mAppStatus.started = false;

            // act
            await run();

            //assert
            expect(mAppStatus.started).toBe(true);
        });
    });
});
