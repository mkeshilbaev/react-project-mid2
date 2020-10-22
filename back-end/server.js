"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_server_1 = require("json-server");
const authorize_middleware_1 = require("./authorize.middleware");
const db_1 = require("./db");
const server = json_server_1.create();
const serverRouter = json_server_1.router(db_1.db);
const middlewares = json_server_1.defaults();
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(json_server_1.bodyParser);
server.use(async (req, res, next) => {
    console.log(req.url)
    if (req.url.startsWith("/users") || req.url.startsWith("/sign-in") || req.url.startsWith("/profile")) {
        next();
        return;
    }
    if (await authorize_middleware_1.isAuthorized(req, db_1.db)) {
        // add your authorization logic here
        next(); // continue to JSON Server router
    }
    else {
        res.sendStatus(401);
    }
});
server.post("/sign-in", async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            error: "Use body to send {username, password}",
        });
    }
    else {
        const token = await authorize_middleware_1.authorize(req.body.username, req.body.password, db_1.db);
        if (token !== false) {
            res.send({ accessToken: token });
        }
        else {
            res.status(400).send({
                error: "No such user or password is incorrect",
            });
        }
    }
});
server.get("/profile", async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            error: "Use body to send {username, password}",
        });
    }
    else {
        let result = await authorize_middleware_1.profile(req, db_1.db)
        res.send(result);
    }
});
server.get("/check", (req, res) => {
    res.send(db_1.db);
});
server.use(serverRouter);
server.listen(3030, () => {
    console.log("JSON Server is running");
});