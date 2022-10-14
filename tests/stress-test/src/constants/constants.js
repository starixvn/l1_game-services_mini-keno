const userAgent = "axios/0.27.2";

const TotalUsers = 800;

const playerIdPrefix = 999;

const PlayerIds = [...Array(TotalUsers).keys()].map((value) => `${playerIdPrefix}${String(value).padStart(3, "0")}`);

const BetAmount = 1;

const UserBetEvent = 10;

export { userAgent, PlayerIds, BetAmount, UserBetEvent, TotalUsers };
