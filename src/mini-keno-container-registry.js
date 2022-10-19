import { asValue, asClass } from "awilix";
import { MultipleTableGamesContainerRegistry } from "sc-multiple-games-base";
import MiniKenoRebetConsumer from "./consumers/rebet-consumer";
import Bot from "./crons/bot";
import UserSignInConsumer from "./consumers/user-signin-consumer";
import ProcessBetQueue from "./crons/process-bet-queue";
import SocketRouter from "./routers/socket-router";

export default class MiniKenoContainerRegistry extends MultipleTableGamesContainerRegistry {
    register(appConfigs, definition, gameData) {
        super.register(appConfigs, definition, gameData);

        this.registerRepositories(definition.repositories);

        return this.container;
    }

    registerRepositories(repositories) {
        this.container.register({
            roundsRepository: asValue(repositories.roundsRepository),
            betsRepository: asValue(repositories.betsRepository),
            betLogsRepository: asValue(repositories.betLogsRepository),
            tempBetsRepository: asValue(repositories.tempBetsRepository),
            resultsRepository: asValue(repositories.resultsRepository),
            allGamesBetsRepository: asValue(repositories.allGamesBetsRepository),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            bot: asClass(Bot).singleton(),
            processBetQueue: asClass(ProcessBetQueue).singleton().proxy(),
        });
    }

    registerRouters() {
        super.registerRouters();
        this.container.register({
            socketRouter: asClass(SocketRouter).proxy(),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            rebetConsumer: asClass(MiniKenoRebetConsumer).singleton(),
            userSignInConsumer: asClass(UserSignInConsumer).singleton(),
        });
    }
}
