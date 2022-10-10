import { io } from "socket.io-client";
import { userAgent } from "../constants/constants";
import config from "../config";

export default (gameInfo, authorizeInfo, afterSignedInFunc) => {
    const socketOptions = {
        forceNew: true,
        transports: ["websocket"],
        upgrade: false,
        path: gameInfo.proxyRoute,
        extraHeaders: {
            "user-agent": userAgent,
        },
    };

    const uri = `${config.proxy}/user/${gameInfo.name.toLowerCase()}`;

    const socket = io(uri, socketOptions);

    socket.on("connect", () => {
        socket.emit("signin", authorizeInfo);
    });

    socket.on("connect_error", (error) => {
        console.log(error);
    });

    socket.on(gameInfo.name, (message) => {
        message.endBet == -1 && console.log(message);
    });

    socket.on("disconnect", (reason) => {
        console.log(reason);
    });

    socket.on("signedIn", () => {
        socket.emit("inGame");
        afterSignedInFunc(socket);
    });
};
