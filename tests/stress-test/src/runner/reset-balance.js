import { PlayerIds } from "../constants/constants";
import { setDefaultBalance } from "../handler/sso-token";

const resetBalance = async () => {
  for await (const playerId of PlayerIds) {
    await setDefaultBalance(playerId);
    console.log(`$${playerId} reset`);
  }

  console.log("RESET BALANCE DONE !");
};

resetBalance();
