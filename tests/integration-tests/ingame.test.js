import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./init-user-session";
import gameSettings from "./stubs/game-settings";

export const ingameTest = () => {
    describe("when user joins game", () => {
        const getTimeOutToPlacingBetTime = (remainingTime, durations) => {
            let timeout = 0;
            if (remainingTime <= durations.lockingBet) {
                timeout = durations.wholeRound - durations.placingBets + remainingTime + 1;
            } else if (remainingTime > durations.placingBets) {
                timeout = durations.wholeRound - durations.placingBets + 1;
            }

            return timeout;
        };

        const getTimeOutToSettleTime = (remainingTime, durations) => {
            let timeout = 0;
            if (remainingTime <= durations.placingBets) {
                timeout = remainingTime + 2;
            }

            return timeout;
        };

        it("should return game configs", (done) => {
            // Arrange
            const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));

            // Act
            normalUserClientDriver.handleSignedInEvent(() => {
                normalUserClientDriver.sendInGameEvent();
            });

            // Assert
            normalUserClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.gameConfigs) {
                    expect(inGameData.gameConfigs.minBet).toEqual(1);
                    expect(inGameData.gameConfigs.maxBet).toEqual(2000);
                    expect(inGameData.gameConfigs.maxBetPerChoices).toStrictEqual({
                        big: 2000,
                        small: 2000,
                        even: 2000,
                        odd: 2000,
                        earth: 1000,
                        fire: 1000,
                        gold: 1000,
                        water: 1000,
                        wood: 1000,
                    });
                    expect(inGameData.gameConfigs.odds).toStrictEqual({
                        big: 2,
                        small: 2,
                        even: 2,
                        odd: 2,
                        earth: 10,
                        fire: 10,
                        gold: 10,
                        water: 2.4,
                        wood: 10,
                    });

                    normalUserClientDriver.close();
                    done();
                }
            });
        });

        it("should return user info", (done) => {
            // Arrange
            const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));

            // Act
            normalUserClientDriver.handleSignedInEvent(() => {
                normalUserClientDriver.sendInGameEvent();
            });

            // Assert
            normalUserClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.user?.UID) {
                    expect(inGameData.user).toStrictEqual({
                        UID: 1,
                        avatarId: 1,
                        currency: "$US",
                        name: "NormalUser",
                        rate: 1,
                        red: 25000,
                        type: false,
                    });

                    normalUserClientDriver.close();
                    done();
                }
            });
        });

        it("should return minikeno round history", (done) => {
            // Arrange
            const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));

            // Act
            normalUserClientDriver.handleSignedInEvent(() => {
                normalUserClientDriver.sendInGameEvent();
            });

            // Assert
            normalUserClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.gameConfigs) {
                    inGameData.roundHistory.forEach((round) => {
                        expect(round.roundId).toBeLessThanOrEqual(inGameData.roundId);
                    });

                    normalUserClientDriver.close();
                    done();
                }
            });
        });

        describe("when join game in placing bet time", () => {
            it("should return resultHash with hashValue", (done) => {
                // Arrange
                const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));

                // Act
                normalUserClientDriver.handleInGameEvent((inGameData) => {
                    if (inGameData.remainingTime) {
                        const timeout = getTimeOutToPlacingBetTime(inGameData.remainingTime, gameSettings[0].durations) * 1000;
                        setTimeout(() => {
                            normalUserClientDriver.sendInGameEvent();
                        }, timeout);
                    }
                });

                // Assert
                normalUserClientDriver.handleInGameEvent((inGameData) => {
                    if (inGameData.gameConfigs && inGameData.resultHash) {
                        expect(inGameData.resultHash.hashValue).not.toBeUndefined();

                        normalUserClientDriver.close();
                        done();
                    }
                });
            });
        });

        describe("when join game in settle time", () => {
            it("should return resultHash with rawValue", (done) => {
                // Arrange
                const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));

                // Act
                normalUserClientDriver.handleInGameEvent((inGameData) => {
                    if (inGameData.remainingTime) {
                        const timeout = getTimeOutToSettleTime(inGameData.remainingTime, gameSettings[0].durations) * 1000;
                        setTimeout(() => {
                            normalUserClientDriver.sendInGameEvent();
                        }, timeout);
                    }
                });

                // Assert
                normalUserClientDriver.handleInGameEvent((inGameData) => {
                    if (inGameData.gameConfigs && inGameData.resultHash) {
                        expect(inGameData.resultHash.rawValue).not.toBeUndefined();

                        normalUserClientDriver.close();
                        done();
                    }
                });
            });
        });
    });
};
