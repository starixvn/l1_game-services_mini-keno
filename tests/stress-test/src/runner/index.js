import playerPlaceBet from "../handler/bet-handler";
import { PlayerIds, TotalUsers } from "../constants/constants";
import { GameInfos } from "../constants/game-info";
import { randomInt } from "../helpers/random";

export const start = async () => {
    for (let playerIndex = 0; playerIndex < TotalUsers; playerIndex++) {
        const socketInfoIndex = randomInt(0, GameInfos.socketInfos.length - 1);
        playerPlaceBet(PlayerIds[playerIndex], GameInfos.socketInfos[socketInfoIndex]);
    }
};
