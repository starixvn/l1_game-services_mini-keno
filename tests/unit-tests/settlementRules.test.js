import settlementRules from "../../src/settlementRules";
import Chance from "chance";

const chance = new Chance();

describe("settlementRules", () => {
    describe("full", () => {
        describe("Odd/Even Tests", () => {
            describe("when total points is even", () => {
                it.each`
                    total
                    ${210}
                    ${810}
                    ${400}
                `("Settlement result with $total points should be even", ({ total }) => {
                    //Act
                    const result = settlementRules.full([total]);

                    //Assert
                    expect(result.even).toBeTrue();
                });
            });

            describe("when total points is odd", () => {
                it.each`
                    total
                    ${811}
                    ${1409}
                    ${555}
                `("Settlement result with $total points should be odd", ({ total }) => {
                    //Act
                    const result = settlementRules.full([total]);

                    //Assert
                    expect(result.odd).toBeTrue();
                });
            });
        });

        describe("Big/Small Tests", () => {
            describe("when total points is in (210,810)", () => {
                // arrange
                const total = chance.integer({ min: 211, max: 809 });

                it.each`
                    total
                    ${210}
                    ${810}
                    ${total}
                `("Settlement result with $total points should be SMALL", ({ total }) => {
                    //Act
                    const result = settlementRules.full([total]);

                    //Assert
                    expect(result.small).toBeTrue();
                });
            });

            describe("when total points is in (811,1410)", () => {
                // arrange
                const total = chance.integer({ min: 812, max: 1409 });

                it.each`
                    total
                    ${811}
                    ${1410}
                    ${total}
                `("Settlement result with $total points should be BIG", ({ total }) => {
                    //Act
                    const result = settlementRules.full([total]);

                    //Assert
                    expect(result.big).toBeTrue();
                });
            });
        });

        describe("Elements Tests", () => {
            describe("when total points is in (210,695)", () => {
                // arrange
                const total = chance.integer({ min: 211, max: 694 });

                it.each`
                    total
                    ${210}
                    ${695}
                    ${total}
                `("Element result with $total points should be GOLD", ({ total }) => {
                    //Act
                    const result = settlementRules.full([total]);

                    //Assert
                    expect(result.gold).toBeTrue();
                });
            });

            describe("when total points is in (696,763)", () => {
                // arrange
                const total = chance.integer({ min: 697, max: 762 });

                it.each`
                    total
                    ${696}
                    ${763}
                    ${total}
                `("Element result with $total points should be WOOD", ({ total }) => {
                    //Act
                    const result = settlementRules.full([total]);

                    //Assert
                    expect(result.wood).toBeTrue();
                });
            });

            describe("when total points is in (764,855)", () => {
                // arrange
                const total = chance.integer({ min: 765, max: 854 });

                it.each`
                    total
                    ${764}
                    ${855}
                    ${total}
                `("Element result with $total points should be WATER", ({ total }) => {
                    //Act
                    const result = settlementRules.full([total]);

                    //Assert
                    expect(result.water).toBeTrue();
                });
            });
            describe("when total points is in (856,923)", () => {
                // arrange
                const total = chance.integer({ min: 857, max: 922 });

                it.each`
                    total
                    ${856}
                    ${923}
                    ${total}
                `("Element result with $total points should be FIRE", ({ total }) => {
                    //Act
                    const result = settlementRules.full([total]);

                    //Assert
                    expect(result.fire).toBeTrue();
                });
            });

            describe("when total points is in (924,1410)", () => {
                // arrange
                const total = chance.integer({ min: 925, max: 1409 });

                it.each`
                    total
                    ${924}
                    ${1410}
                    ${total}
                `("Element result with $total points should be EARTH", ({ total }) => {
                    //Act
                    const result = settlementRules.full([total]);

                    //Assert
                    expect(result.earth).toBeTrue();
                });
            });
        });
    });

    describe("mini", () => {
        describe("Odd/Even Tests", () => {
            describe("when total points is even", () => {
                it.each`
                    total
                    ${58}
                    ${300}
                    ${200}
                `("Settlement result with $total points should be even", ({ total }) => {
                    //Act
                    const result = settlementRules.mini([total]);

                    //Assert
                    expect(result.even).toBeTrue();
                });
            });

            describe("when total points is odd", () => {
                it.each`
                    total
                    ${55}
                    ${311}
                    ${201}
                `("Settlement result with $total points should be odd", ({ total }) => {
                    //Act
                    const result = settlementRules.mini([total]);

                    //Assert
                    expect(result.odd).toBeTrue();
                });
            });
        });

        describe("Big/Small Tests", () => {
            describe("when total points is in (55,205)", () => {
                // arrange
                const total = chance.integer({ min: 56, max: 204 });

                it.each`
                    total
                    ${55}
                    ${205}
                    ${total}
                `("Settlement result with $total points should be SMALL", ({ total }) => {
                    //Act
                    const result = settlementRules.mini([total]);

                    //Assert
                    expect(result.small).toBeTrue();
                });
            });

            describe("when total points is in (206,355)", () => {
                // arrange
                const total = chance.integer({ min: 812, max: 1409 });

                it.each`
                    total
                    ${206}
                    ${355}
                    ${total}
                `("Settlement result with $total points should be BIG", ({ total }) => {
                    //Act
                    const result = settlementRules.mini([total]);

                    //Assert
                    expect(result.big).toBeTrue();
                });
            });
        });

        describe("Elements Tests", () => {
            describe("when total points is in (55,163)", () => {
                // arrange
                const total = chance.integer({ min: 56, max: 162 });

                it.each`
                    total
                    ${55}
                    ${163}
                    ${total}
                `("Element result with $total points should be GOLD", ({ total }) => {
                    //Act
                    const result = settlementRules.mini([total]);

                    //Assert
                    expect(result.gold).toBeTrue();
                });
            });

            describe("when total points is in (164,187)", () => {
                // arrange
                const total = chance.integer({ min: 165, max: 186 });

                it.each`
                    total
                    ${164}
                    ${187}
                    ${total}
                `("Element result with $total points should be WOOD", ({ total }) => {
                    //Act
                    const result = settlementRules.mini([total]);

                    //Assert
                    expect(result.wood).toBeTrue();
                });
            });

            describe("when total points is in (188,222)", () => {
                // arrange
                const total = chance.integer({ min: 189, max: 221 });

                it.each`
                    total
                    ${188}
                    ${222}
                    ${total}
                `("Element result with $total points should be WATER", ({ total }) => {
                    //Act
                    const result = settlementRules.mini([total]);

                    //Assert
                    expect(result.water).toBeTrue();
                });
            });
            describe("when total points is in (223,246)", () => {
                // arrange
                const total = chance.integer({ min: 224, max: 245 });

                it.each`
                    total
                    ${223}
                    ${246}
                    ${total}
                `("Element result with $total points should be FIRE", ({ total }) => {
                    //Act
                    const result = settlementRules.mini([total]);

                    //Assert
                    expect(result.fire).toBeTrue();
                });
            });

            describe("when total points is in (247,355)", () => {
                // arrange
                const total = chance.integer({ min: 248, max: 254 });

                it.each`
                    total
                    ${247}
                    ${355}
                    ${total}
                `("Element result with $total points should be EARTH", ({ total }) => {
                    //Act
                    const result = settlementRules.mini([total]);

                    //Assert
                    expect(result.earth).toBeTrue();
                });
            });
        });
    });
});
