import generateResult from "../../src/shuffleNumbers";

const chanceStub = {
    naturalResult: 10,
    picksetResult: [],
    uniqueResult: [],
    natural: () => {
        return chanceStub.naturalResult;
    },
    pickset: () => {
        return chanceStub.picksetResult;
    },
    unique: () => {
        return chanceStub.uniqueResult;
    },
};

jest.mock("chance", () => {
    return function () {
        return chanceStub;
    };
});

describe("shuffleNumbers", () => {
    describe("genarateResult", () => {
        const testCases = [
            {
                natural: 0,
                expectedValue: [],
            },
            {
                natural: 1,
                expectedValue: [],
            },
            {
                natural: 2,
                expectedValue: [1],
            },
            {
                natural: 3,
                expectedValue: [1],
            },
        ];

        it.each(testCases)("should return correct value", (testCase) => {
            // arrange
            chanceStub.naturalResult = testCase.natural;
            const numberOfPicked = 1;
            const numberOfSeeds = 1;

            // act
            const actualValue = generateResult(numberOfPicked, numberOfSeeds);

            //assert
            expect(actualValue).toStrictEqual(testCase.expectedValue);
        });
    });
});
