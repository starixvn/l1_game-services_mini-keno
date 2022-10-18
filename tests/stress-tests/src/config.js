export default {
    // system: "VG2",
    // owUrl: "https://l2-ows.lumigame.com/SabaClub",
    // simulatorUrl: "https://l2-glbs.lumigame.com",
    // proxy: "https://l2-proxy.lumigame.com",
    system: "SC1",
    owUrl: "https://owapi-simulator.lumigame.com/SabaClub",
    simulatorUrl: "https://gamelobby-simulator.lumigame.com",
    proxy: "https://l1-proxy.lumigame.com",
    gameInfo: {
        gameNames: ["KenoEast", "KenoMini", "KenoMini2", "KenoNorth", "KenoSouth", "KenoWest", "MegaKeno", "MegaKeno2"],
        proxyRoute: "/minikeno/socket.io",
        betChoices: ["big", "small", "odd", "even", "gold", "wood", "water", "fire", "earth"],
    },
    testConfig: {
        totalUsers: 800,
        userBetEvent: 10,
        betAmount: 10,
    },
};
