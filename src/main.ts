import express from "express";

class server {
    webhandler: WebHandler | null = null;
    nginx: NGINXHandler | null = null;
    constructor() {
        globalThis.log.info("Initializing server");
        this.init();
    }

    init() {
        this.webhandler = new WebHandler(6090);
        this.nginx = new NGINXHandler();
        this.webhandler.init();
        this.nginx.init();
    }
}

class NGINXHandler {
    constructor() {
    }

    init() {
        globalThis.log.info("Initializing NGINX server");
    }

    start() {
        globalThis.log.info("Starting NGINX server");
    }

    createConfig() {
        const finalConfig = `
        server {
            listen 9515;
            server_name localhost;
            location / {
                proxy_pass http://localhost:3000;
            }
        }
        `;
        globalThis.log.info("Creating NGINX config");
        globalThis.log.clog(["green"], "success", finalConfig);
    }
}

type route = {
    method: string;
    path: string;
    handler: Function;
}

class WebHandler {
    port: number;
    app = express();

    constructor( port: number ) {
        this.port = port;
    }

    init() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.listen(this.port, () => {
            globalThis.log.info(`Server running on port ${this.port}`);
        });
    }

    addRoute(route: route) {
        this.app[route.method.toLowerCase()](route.path, route.handler);
    }
}

export default server;