import { MultipleGamesSocketRouter } from "sc-multiple-games-base";

export default class SocketRouter extends MultipleGamesSocketRouter {
    constructor({
        definition,
        gameData,
        userSignInConsumer,
        inGameConsumer,
        placeBetConsumer,
        userDisconnectConsumer,
        userSignInPublisher,
        historyQuery,
        logService,
        playGamePermissionValidator,
        rebetConsumer,
    }) {
        super({
            definition,
            gameData,
            userSignInConsumer,
            inGameConsumer,
            placeBetConsumer,
            userDisconnectConsumer,
            userSignInPublisher,
            historyQuery,
            logService,
            playGamePermissionValidator,
        });

        this.rebetConsumer = rebetConsumer;
    }

    init(socketClient) {
        super.init(socketClient);
        socketClient.on("rebet", this.handleRebet.bind(this));
    }

    async handleRebet(payload) {
        try {
            if (!this.verify()) {
                return;
            }

            this.rebetConsumer.consume(this.gameData.realPlayers[this.socketClient.id], payload);
        } catch (error) {
            this.logService.logError(error);
        }
    }
}
