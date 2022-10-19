import { helpers } from "sc-common";

export default class RebetConsumer {
    DisplayMode = {
        Landscape: "1",
        Portrait: "2",
    };

    constructor(definition, gameData, publisher, betsRepository) {
        this.definition = definition;
        this.gameData = gameData;
        this.publisher = publisher;
        this.betsRepository = betsRepository;
    }

    async getOldBet(player) {
        return this.betsRepository
            .findOne({
                roundId: this.gameData.roundId - 1,
                operatorId: player.session.operatorId,
                playerId: player.session.playerId,
            })
            .lean()
            .exec();
    }

    async consume(player, payload) {
        const oldBet = await this.getOldBet(player);

        if (!oldBet) {
            this.publisher.publishToUser(player.UID, { endBet: -1, notice: { errorCode: helpers.noticeHelper.invalidBet } });
            return;
        }

        Object.assign(payload, {
            amount: oldBet.totalAmount,
            freeBet: payload.freeBet ?? false,
            mode: payload.m ?? this.DisplayMode.Landscape,
            receivedTime: new Date(),
        });

        const { name } = player.profile;

        if (!this.gameData.ingame[name]) {
            const newPlayer = {
                name: player.profile.name,
                currency: player.session.currencyName,
                system: player.session.system,
                betTracks: {},
                betQueue: [],

                operatorId: player.session.operatorId,
            };

            this.gameData.ingame[name] = newPlayer;
        }

        this.adjustBetTracks(player.profile.name, oldBet);
        this.gameData.ingame[name].betQueue.push({ player, payload: { rebet: true, oldBet: this.convertOldBet(oldBet), ...payload } });
    }

    convertOldBet(oldBet) {
        const result = {};

        this.definition.choices((choice) => {
            if (oldBet[choice] > 0) {
                result[choice] = oldBet[choice];
            }
        });

        return result;
    }

    adjustBetTracks(playerName, oldBet) {
        const playerInGame = this.gameData.ingame[playerName];

        Object.entries(oldBet).forEach(
            ([choice, amount]) => (playerInGame.betTracks[choice] = (playerInGame.betTracks[choice] ?? 0) + amount)
        );
    }
}
