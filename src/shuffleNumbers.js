import Chance from "chance";
import { MersenneTwister19937, Random } from "random-js";
import { shuffle as d3Shuffle } from "d3-array";
import _ from "lodash";

const chance = new Chance();
const random = new Random(MersenneTwister19937.autoSeed());
const generateSeeds = (numberOfSeeds) => [...Array(numberOfSeeds + 1).keys()].slice(1);

const shuffleThenPickByChance = (numberOfPicked, numberOfSeeds) => {
    return chance.pickset(generateSeeds(numberOfSeeds), numberOfPicked);
};

const randomUniqueNumbersByChance = (numberOfPicked, numberOfSeeds) => {
    return chance.unique(chance.natural, numberOfPicked, { min: 1, max: numberOfSeeds });
};

const shuffleThenPickByRandomJs = (numberOfPicked, numberOfSeeds) => {
    return random.shuffle(generateSeeds(numberOfSeeds)).slice(0, numberOfPicked);
};

const randomlyPickNumbersByRandomJs = (numberOfPicked, numberOfSeeds) => {
    return random.sample(generateSeeds(numberOfSeeds), numberOfPicked);
};

const algorithms = [shuffleThenPickByChance, randomUniqueNumbersByChance, shuffleThenPickByRandomJs, randomlyPickNumbersByRandomJs];

const random1 = (numberOfPicked, numberOfSeeds) => {
    const randomSelection = chance.natural({
        min: 0,
        max: algorithms.length - 1,
    });

    return algorithms[randomSelection](numberOfPicked, numberOfSeeds);
};

const random2 = (numberOfPicked, numberOfSeeds) => {
    return d3Shuffle(d3Shuffle(d3Shuffle(generateSeeds(numberOfSeeds)))).slice(0, numberOfPicked);
};

const random3 = (numberOfPicked, numberOfSeeds) => _.shuffle(_.shuffle(_.shuffle(generateSeeds(numberOfSeeds)))).slice(0, numberOfPicked);

const randomModes = {
    1: [random1],
    2: [random2],
    3: [random3],
};

export default (randomMode, numberOfPicked, numberOfSeeds) => {
    const randomShuffles = randomModes[randomMode] || randomModes[1];

    const result = chance.pickone(randomShuffles)(numberOfPicked, numberOfSeeds);

    return result.sort((pre, next) => pre - next);
};
