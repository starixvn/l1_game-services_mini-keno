import Chance from "chance";
import { MersenneTwister19937, Random } from "random-js";
import { shuffle as d3Shuffle } from "d3-array";
import _ from "lodash";

const chance = new Chance();
const random = new Random(MersenneTwister19937.autoSeed());
const generateSeeds = (numberOfSeeds) => [...Array(numberOfSeeds + 1).keys()].slice(1);

const random1 = (numberOfPicked, numberOfSeeds) =>
    chance.shuffle(chance.shuffle(chance.shuffle(generateSeeds(numberOfSeeds)))).slice(0, numberOfPicked);

const random2 = (numberOfPicked, numberOfSeeds) => {
    return d3Shuffle(d3Shuffle(d3Shuffle(generateSeeds(numberOfSeeds)))).slice(0, numberOfPicked);
};

const random3 = (numberOfPicked, numberOfSeeds) => _.shuffle(_.shuffle(_.shuffle(generateSeeds(numberOfSeeds)))).slice(0, numberOfPicked);

const random4 = (numberOfPicked, numberOfSeeds) => chance.pickset(generateSeeds(numberOfSeeds), numberOfPicked);

const random5 = (numberOfPicked, numberOfSeeds) => chance.unique(chance.natural, numberOfPicked, { min: 1, max: numberOfSeeds });

const random6 = (numberOfPicked, numberOfSeeds) => random.shuffle(generateSeeds(numberOfSeeds)).slice(0, numberOfPicked);

const random7 = (numberOfPicked, numberOfSeeds) => random.sample(generateSeeds(numberOfSeeds), numberOfPicked);

const randomModes = {
    1: [random1, random2, random3, random4],
    2: [random4, random5, random6, random7],
    3: [random1, random3, random5, random7],
};

export default (randomMode, numberOfPicked, numberOfSeeds) => {
    const randomShuffles = randomModes[randomMode] || randomModes[1];
    return chance.pickone(randomShuffles)(numberOfPicked, numberOfSeeds);
};
