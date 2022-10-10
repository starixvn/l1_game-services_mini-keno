import { randomString } from "../helpers/random";
import axios from "axios";
import { userAgent } from "../constants/constants";
import config from "../config";

export const getSSOToken = async (playerId) => {
    const requestBody = {
        playerId: playerId,
        playerName: randomString(8),
        language: "vi-VN",
        currency: "$US",
        seq: "d,y,lumi",
        siteId: "4100300",
        siteName: "lumi",
        ip: "",
        browserUserAgent: userAgent,
        auth: {
            operatorId: "ONEworks1",
            operatorSecret: "ONEworks1@20luminet&",
        },
        gameId: 0,
        domain: "example.com",
        appType: 1,
    };

    const result = await axios.post(`${config.simulatorUrl}/signin/sso`, requestBody);

    return result.data.token;
};

export const setDefaultBalance = async (playerId) => {
    const params = {
        operator: "ow",
        balance: 20000,
        systemType: "SC1",
    };

    return axios.post(
        `${config.owUrl}/SetDefaultBalance?playerId=${playerId}&operator=${params.operator}&balance=${params.balance}&systemType=${params.systemType}`
    );
};

export default getSSOToken;
