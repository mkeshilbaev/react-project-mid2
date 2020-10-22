"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.authorize = void 0;
function toBase64(str) {
    return Buffer.from(str).toString("base64");
}
function fromBase64(str) {
    return Buffer.from(str, "base64").toString("ascii");
}
async function authorize(username, password, db) {
    const user = db.users.find((u) => u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password);
    if (user) {
        const token = `Basic ${toBase64(`${user.username}:${user.password}`)}`;
        return token;
    }
    else {
        return false;
    }
}
exports.authorize = authorize;

async function profile(req, db) {

    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader == "") {
        return false;
    }
    const parts = authHeader.split(" ");
    if (!parts || parts.length != 2 || parts[0] != "Basic") {
        return false;
    }
    const credentials = fromBase64(parts[1]).split(":");
    if (!credentials || credentials.length != 2) {
        return false;
    }
    const user = db.users.find((u) => u.username.toLowerCase() === credentials[0].toLowerCase() &&
        u.password === credentials[1]);
    if (user) {
        return user;
    }
    else {
        return false;
    }
}
exports.profile = profile;

async function isAuthorized(req, db) {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader == "") {
        return false;
    }
    const parts = authHeader.split(" ");
    if (!parts || parts.length != 2 || parts[0] != "Basic") {
        return false;
    }
    const credentials = fromBase64(parts[1]).split(":");
    if (!credentials || credentials.length != 2) {
        return false;
    }
    const result = await authorize(...credentials, db);
    return result != false;
}
exports.isAuthorized = isAuthorized;
