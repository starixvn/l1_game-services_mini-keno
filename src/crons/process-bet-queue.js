import { forEach } from "lodash";
import { Table } from "sc-game-base";

export default class ProcessBetQueue extends Table.Crons.TableProcessBetQueue {
    decreaseBetTracks(playerName, bet) {
        if (bet.rebet) {
            const { oldBet } = bet;
            Object.entries(oldBet).forEach(([betChoice, amount]) => super.decreaseBetTracks(playerName, { betChoice, amount }));
        } else {
            super.decreaseBetTracks(playerName, bet);
        }
    }

    async insertBetLog(player, roundId, bet, rate) {
        const newBetLog = {
            uid: player.UID,
            name: player.profile.name,
            time: new Date(),
            choice: bet.betChoice,
            amount: bet.amount,
            freeBet: bet.freeBet,
            roundId,
            clientSentTime: bet.clientSentTime,
            receivedTime: bet.receivedTime,
        };

        if (bet.rebet) {
            Object.entries(bet.oldBet).forEach(([choice, amount]) => (newBetLog[choice] = amount));
        } else {
            newBetLog[bet.betChoice] = bet.amount;
        }

        if (player.session) {
            newBetLog.siteId = player.session.siteId;
            newBetLog.currency = player.session.currencyName;
            newBetLog.rate = rate;
            newBetLog.operatorId = player.session.operatorId;
            newBetLog.playerId = player.session.playerId;
        }

        await this.betLogsRepository.create(newBetLog);
    }

    async upsertBet(player, roundId, bet, rate) {
        const configs = this.gameData.gameConfigs;
        const newBet = {
            uid: player.UID,
            name: player.profile.name,
            time: new Date(),
            odds: configs.odds,
            freeBet: bet.freeBet,
            roundId,
        };
        const existingBetFilter = { uid: player.UID, roundId, freeBet: bet.freeBet };
        const existingBetIncrement = {
            totalAmount: bet.amount,
        };

        if (bet.rebet) {
            Object.entries(bet.oldBet).forEach(([choice, amount]) => (existingBetIncrement[choice] = amount));
        } else {
            existingBetIncrement[bet.betChoice] = bet.amount;
        }

        if (player.session) {
            newBet.siteId = player.session.siteId;
            newBet.currency = player.session.currencyName;
            newBet.rate = rate;

            newBet.operatorId = player.session.operatorId;
            newBet.playerId = player.session.playerId;
        }

        await this.betsRepository.updateOne(
            existingBetFilter,
            { $inc: existingBetIncrement, $setOnInsert: newBet },
            { upsert: true, setDefaultsOnInsert: true }
        );
    }

    adjustTotalBets(player, bet, rate) {
        if (bet.rebet) {
            const { oldBet } = bet;
            Object.entries(oldBet).forEach(([betChoice, amount]) => super.adjustTotalBets(player, { betChoice, amount }, rate));
        } else {
            super.adjustTotalBets(player, bet, rate);
        }
    }

    adjustOwnBets(playerName, bet) {
        if (bet.rebet) {
            const playerInGame = this.gameData.ingame[playerName];

            if (!playerInGame.ownBets) {
                playerInGame.ownBets = {};
            }
            const { oldBet } = bet;

            Object.entries(oldBet).forEach(([betChoice, amount]) => super.adjustOwnBets(playerName, { betChoice, amount }));
        } else {
            super.adjustOwnBets(playerName, bet);
        }
    }

    generatePlacingBetResult(player, balance, bet, rate) {
        const { betChoice, amount } = bet;
        const ownBet = super.generatePlacingBetResult(player, balance, bet, rate);

        ownBet.ownChip = { betChoice, amount };

        this.updateGameDataChips(player, bet, rate);

        if (this.gameData.players[player.UID]) {
            this.gameData.players[player.UID].red = balance.red;
        }

        if (bet.rebet) {
            ownBet.rebet = bet.oldBet;
        }

        return ownBet;
    }

    updateGameDataChips(player, bet, rate) {
        if (bet.rebet) {
            const chips = this.gameData.currencyGroupGames
                .find((x) => x.groupId.toString() === player.session.currencyGroupId)
                .chips.map((x) => parseInt(x))
                .sort((num1, num2) => num2 - num1);

            Object.entries(oldBet).forEach(([betChoice, amount]) => {
                while (amount > 0) {
                    const chip = chips.find((chip) => chip <= amount);
                    amount = amount - chip;
                    super.updateGameDataChips({ betChoice, amount: chip }, rate);
                }
            });
        } else {
            super.updateGameDataChips(bet, rate);
        }
    }
}
