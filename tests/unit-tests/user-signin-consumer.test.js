import UserSignInConsumer from "../../src/consumers/user-signin-consumer";
import { UserSignInConsumer as BaseUserSignInConsumer } from "sc-game-base/src/core/event-consumers";
import { Systems } from "sc-game-base/src/constants";

describe("UserSignInConsumer", () => {
    describe("inherit test", () => {
        it("should inherit BaseUserSignInConsumer", () => {
            // act
            const consumer = new UserSignInConsumer();

            // assert
            expect(consumer instanceof BaseUserSignInConsumer);
        });
    });

    describe("handleSignInSuccess", () => {
        const definition = { name: "megakeno" };
        let userSignInPublisher = {};
        let mock;
        beforeEach(() => {
            userSignInPublisher = {
                publishToGameMessage: jest.fn(),
            };
            mock = BaseUserSignInConsumer.prototype.handleSignInSuccess;
            BaseUserSignInConsumer.prototype.handleSignInSuccess = jest.fn();
        });
        afterEach(() => {
            userSignInPublisher = {};
            BaseUserSignInConsumer.prototype.handleSignInSuccess = mock;
        });
        const socketClient = { id: "socket" };
        const userInfo = { name: "user" };
        const userSession = { uid: "1" };
        it("should call super handleSignInSuccess", () => {
            // arrange
            const consumer = new UserSignInConsumer(definition, {}, userSignInPublisher);

            // act
            consumer.handleSignInSuccess(socketClient, userInfo, userSession);

            // assert
            expect(BaseUserSignInConsumer.prototype.handleSignInSuccess).toHaveBeenCalledWith(socketClient, userInfo, userSession);
        });

        it("should publish message to user", () => {
            // arrange
            const consumer = new UserSignInConsumer(definition, {}, userSignInPublisher);

            // act
            consumer.handleSignInSuccess(socketClient, userInfo, userSession);

            // assert
            expect(userSignInPublisher.publishToGameMessage).toHaveBeenCalledWith(socketClient, definition.name);
        });
    });

    describe("consume", () => {
        const socketClient = { id: "socket" };

        describe("when system not cocos", () => {
            let mock;
            beforeEach(() => {
                mock = BaseUserSignInConsumer.prototype.consume;
                BaseUserSignInConsumer.prototype.consume = jest.fn();
            });
            afterEach(() => {
                BaseUserSignInConsumer.prototype.consume = mock;
            });
            it("should call super function when system is mobi", async () => {
                // arrange
                const consumer = new UserSignInConsumer();
                const payload = { system: Systems.Mobi };

                // act
                await consumer.consume(socketClient, payload);

                // assert
                expect(BaseUserSignInConsumer.prototype.consume).toHaveBeenCalledWith(socketClient, payload);
            });
            it("should call super function when system is mini", async () => {
                // arrange
                const consumer = new UserSignInConsumer();
                const payload = { system: Systems.Mini };

                // act
                await consumer.consume(socketClient, payload);

                // assert
                expect(BaseUserSignInConsumer.prototype.consume).toHaveBeenCalledWith(socketClient, payload);
            });
            it("should call super function when system is mega keno", async () => {
                // arrange
                const consumer = new UserSignInConsumer();
                const payload = { system: 4 };

                // act
                await consumer.consume(socketClient, payload);

                // assert
                expect(BaseUserSignInConsumer.prototype.consume).toHaveBeenCalledWith(socketClient, payload);
            });
        });

        describe("when system is cocos", () => {
            let mock;
            let userSignInPublisher = {};
            beforeEach(() => {
                mock = BaseUserSignInConsumer.prototype.consume;
                BaseUserSignInConsumer.prototype.consume = jest.fn();
                userSignInPublisher = {
                    publishUmNotice: jest.fn(),
                };
            });
            afterEach(() => {
                userSignInPublisher = {};
                BaseUserSignInConsumer.prototype.consume = mock;
                userSignInPublisher = {};
            });
            it("should call super consume when game is enable", async () => {
                // arrange
                const gameData = {
                    gameConfigs: { enabled: true },
                    delayStartTime: 0,
                };
                const consumer = new UserSignInConsumer({}, gameData);
                const payload = { system: Systems.Cocos };

                // act
                await consumer.consume(socketClient, payload);

                // assert
                expect(BaseUserSignInConsumer.prototype.consume).toHaveBeenCalledWith(socketClient, payload);
            });

            it("should publish UM notice when game is disable", async () => {
                // arrange
                const gameData = {
                    gameConfigs: { enabled: false },
                    delayStartTime: 0,
                    umMessages: "disable",
                };
                const consumer = new UserSignInConsumer({}, gameData, userSignInPublisher);
                const payload = { system: Systems.Cocos };

                // act
                await consumer.consume(socketClient, payload);

                // assert
                expect(userSignInPublisher.publishUmNotice).toHaveBeenCalledWith(socketClient, gameData.umMessages);
            });

            it("should publish UM notice when gameConfigs undefine", async () => {
                // arrange
                const gameData = {
                    delayStartTime: 0,
                    umMessages: "disable",
                };
                const consumer = new UserSignInConsumer({}, gameData, userSignInPublisher);
                const payload = { system: Systems.Cocos };

                // act
                await consumer.consume(socketClient, payload);

                // assert
                expect(userSignInPublisher.publishUmNotice).toHaveBeenCalledWith(socketClient, gameData.umMessages);
            });

            it("should publish UM notice when enabled undefine", async () => {
                // arrange
                const gameData = {
                    gameConfigs: { enabled: false },
                    delayStartTime: 0,
                    umMessages: "disable",
                };
                const consumer = new UserSignInConsumer({}, gameData, userSignInPublisher);
                const payload = { system: Systems.Cocos };

                // act
                await consumer.consume(socketClient, payload);

                // assert
                expect(userSignInPublisher.publishUmNotice).toHaveBeenCalledWith(socketClient, gameData.umMessages);
            });

            it("should publish UM notice when delayStartTime greater than 0", async () => {
                // arrange
                const gameData = {
                    gameConfigs: { enabled: true },
                    delayStartTime: 1,
                    umMessages: "disable",
                };
                const consumer = new UserSignInConsumer({}, gameData, userSignInPublisher);
                const payload = { system: Systems.Cocos };

                // act
                await consumer.consume(socketClient, payload);

                // assert
                expect(userSignInPublisher.publishUmNotice).toHaveBeenCalledWith(socketClient, gameData.umMessages);
            });
        });
    });
});
