import { asValue } from "awilix";
import { MultipleTableGamesContainerRegistry } from "sc-multiple-games-base";
import Bot from "./crons/bot";

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
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            bot: asClass(Bot).singleton(),
        });
    }
}
