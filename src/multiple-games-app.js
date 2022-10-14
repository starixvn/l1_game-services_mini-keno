import { Table, Core } from "sc-game-base";
import MiniKenoContainerRegistry from "./mini-keno-container-registry";

export default class MultipleGamesApp extends Core.BaseGameApp {
    /**
     * @param {Core.GameDefinition[]} definitions
     */
    startGames(definitions) {

        definitions.forEach(async (definition) => {
            const container = new MiniKenoContainerRegistry().register(
                this.appConfigs,
                definition,
                new Table.TableGameData(definition.durations.wholeRound)
            );

            await this.startGame(container);
        });
    }
}
