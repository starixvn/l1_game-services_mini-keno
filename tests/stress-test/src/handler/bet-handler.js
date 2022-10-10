import getSSOToken from "../handler/sso-token";
import { authorize } from "../handler/user-service-sso";
import connectSocket from "./socket-client";
import { UserBetEvent, BetAmount } from "../constants/constants";
import { GameInfos } from "../constants/game-info";
import { randomInt } from "../helpers/random";

const autoPlaceBet = (socket) => {
    for (let i = 0; i < UserBetEvent; i++) {
        const betChoice = GameInfos.betChoices[randomInt(0, GameInfos.betChoices.length - 1)];

        socket.emit("bet", { amount: BetAmount, betChoice });
    }
};

export default async function (playerId, gameInfo) {
    try {
        const ssoToken = await getSSOToken(playerId);
        const authorizeInfo = await authorize(ssoToken);

        connectSocket(gameInfo, authorizeInfo, autoPlaceBet);
    } catch (e) {
        console.log(e);
    }
}
