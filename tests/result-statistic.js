import generateResult from "../src/shuffleNumbers";
import { hedgeBetGroups } from "../src/game-settings";
import getSettlementResult from "../src/settlementRules";

function run() {
    const totalRounds = 100_000;
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

    const randomMode = 1;

    for (let index = 0; index < totalRounds; index++) {
        const numberOfPicked = 20,
            numberOfSeeds = 80;
        const result = generateResult(randomMode, numberOfPicked, numberOfSeeds);
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
    console.log(`======== Run ${totalRounds} rounds ========`);

    console.log(stats);
    console.log(`Longest streaks (>=${longestStreak}): `);
    console.log(JSON.stringify(streaks));
}

run();
