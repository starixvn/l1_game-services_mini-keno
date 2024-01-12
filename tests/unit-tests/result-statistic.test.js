import { hedgeBetGroups } from "../../src/game-settings";
import getSettlementResult from "../../src/settlementRules";
import generateResult from "../../src/shuffleNumbers";

describe("Mini keno - Running 10000 rounds  ", () => {
    it.each([1, 2, 3])("Mode %d", (mode) => {
        const totalRounds = 10_000;
        const streaks = {
            big: {},
            small: {},
            odd: {},
            even: {},
        };

        const streakNumber = 4;
        const longestStreak = 4;
        let occurrences = {};
        let prevResult = {};

        const stats = {
            streaks: { total: 0, big: 0, small: 0, odd: 0, even: 0 },
        };

        for (let index = 0; index < totalRounds; index++) {
            const numberOfPicked = 20,
                numberOfSeeds = 80;
            const result = generateResult(mode, numberOfPicked, numberOfSeeds);
            const settlement = getSettlementResult.full(result);

            hedgeBetGroups.forEach((group) => {
                const currentWinningOption = group.find((choice) => settlement[choice]);

                if (prevResult[currentWinningOption]) {
                    occurrences[currentWinningOption]++;
                } else {
                    if (occurrences[currentWinningOption] >= streakNumber) {
                        stats.streaks.total++;
                        stats.streaks[currentWinningOption]++;

                        if (occurrences[currentWinningOption] >= longestStreak) {
                            streaks[currentWinningOption][occurrences[currentWinningOption]] =
                                streaks[currentWinningOption][occurrences[currentWinningOption]] ?? 0;
                            streaks[currentWinningOption][occurrences[currentWinningOption]]++;
                        }
                    }

                    occurrences[currentWinningOption] = 1;
                }
            });

            prevResult = settlement;

            Object.keys(settlement).reduce((choiceResults, choice) => {
                stats[choice] = stats[choice] ?? { count: 0, ratio: 0 };
                stats[choice].count += settlement[choice] ? 1 : 0;
                stats[choice].ratio = stats[choice].count / totalRounds;
            }, {});
        }

        expect(stats.odd.ratio).toBeGreaterThanOrEqual(0.485);
        expect(stats.even.ratio).toBeGreaterThanOrEqual(0.485);
        expect(stats.big.ratio).toBeGreaterThanOrEqual(0.485);
        expect(stats.small.ratio).toBeGreaterThanOrEqual(0.485);
        console.log(`======== Run ${totalRounds} rounds in mode ${mode} ========`);
        console.log(stats);
        console.log(`Longest streaks (>=${longestStreak}) in mode ${mode} : `);
        console.log(streaks);
    });
});
