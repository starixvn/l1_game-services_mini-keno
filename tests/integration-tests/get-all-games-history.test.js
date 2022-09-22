import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./init-user-session";

export const getAllGamesHistoryTests = () => {
    describe("getAllGamesHistoryTests", () => {
        let normalUserClientDriver;
        it("should receive history from all games", (done) => {
            // Arrange & Act
            normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));

            normalUserClientDriver.handleSignedInEvent(() => {
                normalUserClientDriver.socket.emit("getAllGamesHistory", { page: 1 });
            });

            // Assert
            normalUserClientDriver.on(socketOptions.gameName, (data) => {
                if (data?.history) {
                    expect(data.history.betLogs).not.toBeEmpty();
                    done();
                }
            });
        });

        afterEach(() => {
            normalUserClientDriver.close();
        });
    });
};
