import { asValue, asClass } from "awilix";
import { MultipleTableGamesContainerRegistry, MultipleGamesSocketRouter } from "sc-multiple-games-base";
import Bot from "./crons/bot";
import UserSignInConsumer from "./consumers/user-signin-consumer";
import { RebetContainerRegistry } from "sc-rebet-mode";
import GameCron from "./crons/game-cron";
import ProcessBetQueue from "./crons/process-bet-queue";
import PlaceBetPublisher from "./publishers/place-bet-publisher";

export default class MiniKenoContainerRegistry extends MultipleTableGamesContainerRegistry {
    register(appConfigs, definition, gameData) {
        super.register(appConfigs, definition, gameData);

        this.registerRepositories(definition.repositories);

        this.container.register(new RebetContainerRegistry().register(MultipleGamesSocketRouter));

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
            gameCron: asClass(GameCron).singleton().proxy(),
            processBetQueue: asClass(ProcessBetQueue).singleton().proxy(),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            userSignInConsumer: asClass(UserSignInConsumer).singleton(),
        });
    }

    registerPublishers() {
        super.registerPublishers();

        this.container.register({
            placeBetPublisher: asClass(PlaceBetPublisher).singleton(),
        });
    }
}
