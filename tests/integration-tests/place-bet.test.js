import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./init-user-session";
import gameSettings from "./stubs/game-settings";

export const placeBetTest = () => {
    describe("place bet", () => {
        const getTimeOutToBet = (remainingTime, durations) => {
            let timeout = 0;
            if (remainingTime <= durations.lockingBet) {
                timeout = durations.wholeRound - durations.placingBets + remainingTime + 2;
            } else if (remainingTime >= durations.placingBets) {
                timeout = remainingTime - durations.placingBets + 2;
            }

            return timeout;
        };

        const getTimeOutToBetInvalid = (remainingTime, durations) => {
            let timeout = 0;
            if (remainingTime >= durations.lockingBet && remainingTime <= durations.placingBets) {
                timeout = remainingTime - durations.lockingBet + 1;
            }

            return timeout;
        };

        const getTimeOutToNextRound = (remainingTime, durations) => {
            return remainingTime + durations.wholeRound - durations.placingBets + 5;
        };

        describe("when place bet in placing bet time", () => {
            const betOnNextRound = ["small", "odd"]; // hedge bet validation
            const betOnFirstRound = gameSettings[0].choices.filter((choice) => !betOnNextRound.includes(choice));
            let isNextRound = false;

            describe("when place bet with valid bet choices", () => {
                betOnFirstRound.forEach((choice) => {
                    describe(`when place bet with "${choice}"`, () => {
                        it("should return own bet data", (done) => {
                            // Arrange
                            const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
                            client.handleSignedInEvent(() => {
                                client.sendInGameEvent();
                            });
                            let receivedRemainingTime = false;

                            // Act
                            client.on(socketOptions.gameName, (inGameData) => {
                                if (inGameData.remainingTime && !receivedRemainingTime) {
                                    receivedRemainingTime = true;
                                    setTimeout(() => {
                                        console.log(`betChoice: '${choice}', amount: 100`);
                                        client.emit(eventTypes.bet, { betChoice: choice, amount: 100 });
                                    }, getTimeOutToBet(inGameData.remainingTime, gameSettings[0].durations) * 1000);
                                }
                            });

                            // Assert
                            client.on(socketOptions.gameName, (data) => {
                                if (data.endBet) {
                                    expect(data.betChoice).toBe(choice);
                                    expect(data.endBet).toBe(100);
                                    expect(data.ownBets[choice]).toEqual(100);

                                    client.close();
                                    done();
                                }
                            });
                        });
                    });
                });

                betOnNextRound.forEach((choice) => {
                    describe(`when place bet with "${choice}"`, () => {
                        it("should return own bet data", (done) => {
                            // Arrange
                            const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
                            client.handleSignedInEvent(() => {
                                client.sendInGameEvent();
                            });
                            let receivedRemainingTime = false;

                            // Act
                            client.on(socketOptions.gameName, (inGameData) => {
                                const placeBetWaitingTime = isNextRound
                                    ? getTimeOutToBet(inGameData.remainingTime, gameSettings[0].durations)
                                    : getTimeOutToNextRound(inGameData.remainingTime, gameSettings[0].durations);
                                if (inGameData.remainingTime && !receivedRemainingTime) {
                                    receivedRemainingTime = true;
                                    setTimeout(() => {
                                        isNextRound = true;
                                        console.log(`betChoice: '${choice}', amount: 100`);
                                        client.emit(eventTypes.bet, { betChoice: choice, amount: 100 });
                                    }, placeBetWaitingTime * 1000);
                                }
                            });

                            // Assert
                            client.on(socketOptions.gameName, (data) => {
                                if (data.endBet) {
                                    data.endBet == -1 && console.log(data);

                                    expect(data.betChoice).toBe(choice);
                                    expect(data.endBet).toBe(100);
                                    expect(data.ownBets[choice]).toEqual(100);

                                    client.close();
                                    done();
                                }
                            });
                        });
                    });
                });
            });

            describe("when place hedge bet", () => {
                const hedgeBetGroups = gameSettings[0].hedgeBetGroups;

                hedgeBetGroups.forEach((choices) => {
                    describe(`when player place bet on ${choices[0]} and ${choices[1]}`, () => {
                        it("should return bet failed", (done) => {
                            // Arrange
                            const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
                            const betChoice = choices.find((choice) => !betOnNextRound.includes(choice));
                            client.handleSignedInEvent(() => {
                                client.sendInGameEvent();
                            });
                            let receivedRemainingTime = false;

                            // Act
                            client.on(socketOptions.gameName, (inGameData) => {
                                if (inGameData.remainingTime && !receivedRemainingTime) {
                                    receivedRemainingTime = true;
                                    setTimeout(() => {
                                        client.emit(eventTypes.bet, { betChoice, amount: 100 });
                                    }, getTimeOutToBet(inGameData.remainingTime, gameSettings[0].durations) * 1000);
                                }
                            });

                            // Assert
                            client.on(socketOptions.gameName, (data) => {
                                if (data.endBet) {
                                    console.log(data);
                                    expect(data.betChoice).toBe(betChoice);
                                    expect(data.endBet).toBe(-1);
                                    expect(data.notice.errorCode).toEqual("SB1939");

                                    client.close();
                                    done();
                                }
                            });
                        });
                    });
                });
            });
        });

        describe("when place bet NOT in placing bet time", () => {
            it("should return invalid", (done) => {
                // Arrange
                const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
                client.handleSignedInEvent(() => {
                    client.sendInGameEvent();
                });
                let receivedRemainingTime = false;

                // Act
                client.on(socketOptions.gameName, (inGameData) => {
                    if (inGameData.remainingTime && !receivedRemainingTime) {
                        receivedRemainingTime = true;
                        setTimeout(() => {
                            client.emit(eventTypes.bet, { betChoice: "big", amount: 100 });
                        }, getTimeOutToBetInvalid(inGameData.remainingTime, gameSettings[0].durations) * 1000);
                    }
                });

                // Assert
                client.on(socketOptions.gameName, (data) => {
                    if (data.endBet) {
                        expect(data.endBet).toBe(-1);

                        client.close();
                        done();
                    }
                });
            });
        });
    });
};
