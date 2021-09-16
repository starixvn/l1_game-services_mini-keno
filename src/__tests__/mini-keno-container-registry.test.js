import MiniKenoContainerRegistry from "../mini-keno-container-registry";
import { MultipleGamesContainerRegistry } from "sc-multiple-games-base";

describe("mini-keno-container-registry", () => {
    describe("extends", () => {
        it("inherit MultipleGamesContainerRegistry", () => {
            // arrange
            const serviceContainerRegistry = new MiniKenoContainerRegistry();

            //assert
            expect(serviceContainerRegistry instanceof MultipleGamesContainerRegistry);
        });
    });
});
