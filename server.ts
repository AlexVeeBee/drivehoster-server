import { logger } from "./src/utils/logger";

declare global {
    var log: logger;
}

globalThis.log = new logger();
log.info("Preparing server");

import server from "./src/main";
const s = new server();

s.webhandler?.app.get("/api/ping", (req, res) => {
    res.send("pong");
});