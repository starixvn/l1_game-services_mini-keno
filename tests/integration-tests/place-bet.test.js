import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import { gameConfig, socketOptions } from "./stubs/test-data";
import { initUserSession } from "./init-user-session";
import gameSettings from "./stubs/game-settings";
import Chance from "chance";

const chance = new Chance();

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

            describe("when place bet with amount > max bet", () => {
                it("should return bet failed", (done) => {
                    // Arrange
                    const choice = chance.pickone(gameSettings[0].choices);
                    const maxBet = gameConfig.maxBetPerChoices[choice];
                    const betAmount = maxBet + 1;
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
                                console.log(`betChoice: '${choice}', amount: ${betAmount}`);
                                client.emit(eventTypes.bet, { betChoice: choice, amount: betAmount });
                            }, getTimeOutToNextRound(inGameData.remainingTime, gameSettings[0].durations) * 1000);
                        }
                    });

                    // Assert
                    client.on(socketOptions.gameName, (data) => {
                        if (data.endBet) {
                            expect(data.betChoice).toBe(choice);
                            expect(data.endBet).toBe(-1);
                            expect(data.notice.errorCode).toEqual("SB1910");

                            client.close();
                            done();
                        }
                    });
                });
            });

            describe("when place bet with amount < min bet", () => {
                it("should return bet failed", (done) => {
                    // Arrange
                    const choice = chance.pickone(gameSettings[0].choices);
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
                                console.log(`betChoice: '${choice}', amount: -1`);
                                client.emit(eventTypes.bet, { betChoice: choice, amount: -1 });
                            }, getTimeOutToBet(inGameData.remainingTime, gameSettings[0].durations) * 1000);
                        }
                    });

                    // Assert
                    client.on(socketOptions.gameName, (data) => {
                        if (data.endBet) {
                            expect(data.betChoice).toBe(choice);
                            expect(data.endBet).toBe(-1);
                            expect(data.notice.errorCode).toEqual("SB1909");

                            client.close();
                            done();
                        }
                    });
                });
            });

            describe("when place bet reach max bet on round", () => {
                it("should return bet failed", (done) => {
                    // Arrange
                    const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
                    client.handleSignedInEvent(() => {
                        client.sendInGameEvent();
                    });
                    let receivedRemainingTime = false;
                    let isHavingBet = false;

                    // Act
                    client.on(socketOptions.gameName, (inGameData) => {
                        if (inGameData.remainingTime && !receivedRemainingTime) {
                            const timeOutToBet = getTimeOutToBet(inGameData.remainingTime, gameSettings[0].durations) * 1000;

                            receivedRemainingTime = true;
                            setTimeout(() => {
                                console.log(`betChoice: 'big', amount: 2000`);
                                client.emit(eventTypes.bet, { betChoice: "big", amount: 2000 });
                            }, timeOutToBet);

                            setTimeout(() => {
                                console.log(`betChoice: 'odd', amount: 2000`);
                                client.emit(eventTypes.bet, { betChoice: "odd", amount: 2000 });
                            }, timeOutToBet + 1000);
                        }
                    });

                    // Assert
                    client.on(socketOptions.gameName, (data) => {
                        if (data.endBet && isHavingBet) {
                            expect(data.endBet).toBe(-1);
                            expect(data.notice.errorCode).toEqual("SB1911");

                            client.close();
                            done();
                        }

                        data.endBet && (isHavingBet = true);
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
