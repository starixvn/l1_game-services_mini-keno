import { stub, stubMongoose } from "jest-micro-auto-stub";
import mongoose from "mongoose";
import { Core, Table } from "sc-game-base";

import constants from "../../src/constants";
import Bot from "../../src/crons/bot";
import gameSettings from "../../src/game-settings";

const definition = new Table.TableGameDefinition(gameSettings[0]);
const gameData = new Table.TableGameData(0);
const publisher = stub(Core.BaseEventPublishers);
/** @type {mongoose.Model}*/
/** @type {mongoose.Model}*/
const tempBetsRepository = stubMongoose(mongoose.Model);
const userInfosRepository = stubMongoose(mongoose.Model);
let botRunner = new Bot(definition, gameData, publisher, userInfosRepository, tempBetsRepository);
const bot = {
    id: 1,
    name: "bot1",
    red: 1000,
    type: true,
    choices: [],
    remainTickets: 3,
    totalBet: 0,
    betOnChoices: { ...constants.resetTotalBets },
};
const totalBetTemplate = {
    big: 300,
    small: 500,
    odd: 0,
    even: 0,
    earth: 1,
    fire: 1,
    gold: 1,
    water: 1,
    wood: 2,
};

gameData.gameConfigs = {
    choices_maxbet: {
        big: 2000,
        small: 2000,
        even: 2000,
        odd: 2000,
        earth: 500,
        fire: 1500,
        gold: 500,
        water: 2000,
        wood: 1500,
    },
    minbet: 1,
    bot_maxbet: 200,
};

afterEach(() => {
    botRunner = new Bot(definition, gameData, publisher, userInfosRepository, tempBetsRepository);
});

describe("inherit test", () => {
    it("should inherit TableGameBot", () => {
        expect(botRunner instanceof Table.Crons.TableGameBot);
    });
});

describe("resetAllBotData test", () => {
    it("should call resetAllBets and resetAllBotData", () => {
        spyOn(Table.Crons.TableGameBot.prototype, "resetAllBotData");
        spyOn(Bot.prototype, "resetAllBets");

        botRunner.resetAllBotData();

        expect(Table.Crons.TableGameBot.prototype.resetAllBotData).toHaveBeenCalled();
        expect(Bot.prototype.resetAllBets).toHaveBeenCalled();
    });
});

describe("resetAllBets test", () => {
    it("should allBets and smallTickets reset to zero", () => {
        botRunner.smallTickets = 4;
        botRunner.allBets = {
            big: 3,
            small: 5,
            odd: 2,
            even: 100,
            earth: 35,
            fire: 20,
            gold: 1,
            water: 4,
            wood: 7,
        };

        botRunner.resetAllBets();

        expect(botRunner.smallTickets).toBe(0);
        expect(botRunner.allBets).toEqual(constants.resetTotalBets);
    });
});

describe("getBetChoice test", () => {
    it("should return main options when main bet ratio hasn't reached", () => {
        botRunner.allBets = {
            big: 300,
            small: 500,
            odd: 2,
            even: 100,
            earth: 35,
            fire: 20,
            gold: 1,
            water: 4,
            wood: 7,
        };

        const choice = botRunner.getBetChoice(bot);

        expect(botRunner.mainOpts).toContain(choice);
    });

    it("should return sub options when main and rare bet ratio reached", () => {
        botRunner.allBets = {
            big: 400,
            small: 460,
            odd: 0,
            even: 0,
            earth: 0,
            fire: 0,
            gold: 40,
            water: 0,
            wood: 0,
        };

        const choice = botRunner.getBetChoice(bot);

        expect(botRunner.subOpts).toContain(choice);
    });

    it("should return rare options when main and sub bet ratio reached", () => {
        botRunner.allBets.big = 4000;
        botRunner.allBets.small = 300;
        botRunner.allBets.odd = 350;
        botRunner.allBets.even = 150;

        const choice = botRunner.getBetChoice(bot);

        expect(botRunner.rareOpts).toContain(choice);
    });
});

describe("getMaxBet test", () => {
    it("should return value between min and max bet config", () => {
        const choice = "big";
        const { bot_maxbet, minbet, choices_maxbet } = gameData.gameConfigs;
        const maxBet = Math.min(bot_maxbet, choices_maxbet[choice]);

        const actualResult = botRunner.getMaxBet({ ...bot, betOnChoices: { ...totalBetTemplate } }, choice);

        expect(actualResult).toBeWithin(minbet, maxBet);
    });
});

describe("getRandomChoiceFromGroup test", () => {
    test.each`
        group                 | groupName
        ${botRunner.mainOpts} | ${"main"}
        ${botRunner.subOpts}  | ${"sub"}
        ${botRunner.rareOpts} | ${"rare"}
    `("should return options of $groupName group", ({ group }) => {
        const choice = botRunner.getRandomChoiceFromGroup(group);

        expect(group).toContain(choice);
    });
});

describe("getTotalAmountOnChoiceGroup test", () => {
    test.each`
        group                 | groupName | expectResult
        ${botRunner.mainOpts} | ${"main"} | ${800}
        ${botRunner.subOpts}  | ${"sub"}  | ${0}
        ${botRunner.rareOpts} | ${"rare"} | ${6}
    `("should return total amount of $groupName group", ({ group, expectResult }) => {
        botRunner.allBets = { ...totalBetTemplate };

        const totalAmountOnGroup = botRunner.getTotalAmountOnChoiceGroup(group);

        expect(totalAmountOnGroup).toEqual(expectResult);
    });
});

describe("getTotalAmountOfBotOnChoiceGroup test", () => {
    test.each`
        group                 | groupName | expectResult
        ${botRunner.mainOpts} | ${"main"} | ${800}
        ${botRunner.subOpts}  | ${"sub"}  | ${0}
        ${botRunner.rareOpts} | ${"rare"} | ${6}
    `("should return total amount of $groupName group", ({ group, expectResult }) => {
        const betOnChoices = { ...totalBetTemplate };

        const totalAmountOnGroup = botRunner.getTotalAmountOfBotOnChoiceGroup({ betOnChoices }, group);

        expect(totalAmountOnGroup).toEqual(expectResult);
    });
});

describe("getAllBetAmount test", () => {
    it("should return total amount bot bets", () => {
        botRunner.allBets = { ...totalBetTemplate };

        const actualResult = botRunner.getAllBetAmount();

        expect(actualResult).toEqual(806);
    });
});

describe("isSmallTicket test", () => {
    describe("when amount below 50 times minbet", () => {
        it("should return true", () => {
            const amount = 49;

            const actualResult = botRunner.isSmallTicket(amount);

            expect(actualResult).toBe(true);
        });
    });
});

describe("updateBotInRoomData test", () => {
    it("should call super method", () => {
        spyOn(Table.Crons.TableGameBot.prototype, "updateBotInRoomData");

        botRunner.updateBotInRoomData(bot, "big", 100, bot.red);

        expect(Table.Crons.TableGameBot.prototype.updateBotInRoomData).toHaveBeenCalled();
    });

    it("should update allBets and small ticket", () => {
        const betAmount = 45;
        botRunner.smallTickets = 0;
        botRunner.allBets = { ...totalBetTemplate };

        botRunner.updateBotInRoomData(bot, "big", betAmount, bot.red);

        expect(botRunner.allBets.big).toEqual(totalBetTemplate.big + betAmount);
        expect(botRunner.smallTickets).toEqual(1);
    });
});

describe("convertAmountToChip test", () => {
    it("should return chip amount on chip list", () => {
        const amount = 46;

        const chip = botRunner.convertAmountToChip(amount);

        expect(constants.chips).toContain(chip);
    });
});

describe("getTotalBetAmount test", () => {
    describe("when current bet is undefined", () => {
        it("Total bet amount should be zero", () => {
            const actualResult = botRunner.getTotalBetAmount();

            expect(actualResult).toEqual(0);
        });
    });

    it("should return total bet amount", () => {
        const currentBet = { ...totalBetTemplate };

        const actualResult = botRunner.getTotalBetAmount(currentBet);

        expect(actualResult).toEqual(806);
    });
});
