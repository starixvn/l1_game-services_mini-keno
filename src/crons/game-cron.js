import { Table } from "sc-game-base";

export default class GameCron extends Table.Crons.TableGameCron {
    async getLastArchiveRound() {
        const { configName } = this.definition;
        const archiveStatus = await this.archiveStatusesRepository.findOne({ name: configName }, "lastArcId").lean().exec();

        return archiveStatus ? (archiveStatus.lastArcId["_phiens"] ?? archiveStatus.lastArcId["_rounds"]) + 1 : 1;
    }
}
