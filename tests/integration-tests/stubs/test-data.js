const game = {
    id: 52,
    name: "megakeno",
};

const currencyData = { code: "USD", name: "$US" };

const socketOptions = {
    socketUri: `http://localhost:5002/user/megakeno`,
    gameName: "MegaKeno",
    proxyRoute: "/socket.io",
};

const gameConfig = {
    gameId: 52,
    name: "megakeno",
    enabled: true,
    minBet: 1,
    maxBet: 2000,
    maxBetPerChoices: { big: 2000, small: 2000, even: 2000, odd: 2000, earth: 1000, fire: 1000, gold: 1000, water: 1000, wood: 1000 },
    chips: ["1", "20", "50", "100", "200", "500", "1000", "2000"],
    stakeLevels: [],
    type: 1,
    botenabled: true,
    bot_maxbet: 10,
    hour_maxbot: [0, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    choices_maxbet: null,
    odds: { big: 2, small: 2, even: 2, odd: 2, earth: 10, fire: 10, gold: 10, water: 2.4, wood: 10 },
};

const rounds = [
    {
        result: [5, 15, 72, 59, 74, 46, 32, 77, 30, 26, 40, 4, 31, 22, 61, 63, 56, 13, 41, 42],
        id: 1,
        settlementResult: {
            big: false,
            small: true,
            odd: true,
            even: false,
            gold: false,
            wood: false,
            water: true,
            fire: false,
            earth: false,
        },
        exchangeRateId: 2681,
    },
    {
        result: [36, 70, 25, 45, 23, 6, 27, 34, 55, 80, 76, 11, 31, 59, 78, 35, 29, 48, 14, 57],
        id: 2,
        settlementResult: {
            big: true,
            small: false,
            odd: true,
            even: false,
            gold: false,
            wood: false,
            water: true,
            fire: false,
            earth: false,
        },
        exchangeRateId: 2681,
    },
    {
        result: [3, 35, 2, 33, 20, 65, 59, 44, 49, 24, 69, 16, 64, 80, 52, 47, 32, 27, 11, 23],
        id: 3,
        settlementResult: {
            big: false,
            small: true,
            odd: true,
            even: false,
            gold: false,
            wood: true,
            water: false,
            fire: false,
            earth: false,
        },
        exchangeRateId: 2681,
    },
];

const userBetData = (uid) => {
    return [
        {
            freeBet: false,
            betwin: 196,
            big: 50,
            uid: uid,
            currency: "$US",
            earth: 0,
            even: 50,
            fire: 0,
            gold: 50,
            name: "NormalUser",
            odd: 0,
            odds: { big: 1.96, small: 1.96, even: 1.96, odd: 1.96, earth: 9.2, fire: 4.6, gold: 9.2, water: 2.4, wood: 4.6 },
            operatorId: "dummy-operator-id",
            paid: true,
            playerId: 1,
            rate: 1,
            roundId: 1,
            siteId: "111",
            small: 0,
            water: 0,
            wood: 0,
        },
        {
            freeBet: false,
            betwin: 0,
            big: 0,
            uid: uid,
            currency: "$US",
            earth: 0,
            even: 0,
            fire: 0,
            gold: 50,
            name: "NormalUser",
            odd: 0,
            odds: { big: 1.96, small: 1.96, even: 1.96, odd: 1.96, earth: 9.2, fire: 4.6, gold: 9.2, water: 2.4, wood: 4.6 },
            operatorId: "dummy-operator-id",
            paid: true,
            playerId: 1,
            rate: 1,
            roundId: 2,
            siteId: "111",
            small: 0,
            water: 0,
            wood: 50,
        },
    ];
};

export { game, currencyData, socketOptions, gameConfig, rounds, userBetData };
