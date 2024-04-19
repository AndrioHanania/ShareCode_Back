"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sessionDB_1 = require("../db/sessionDB");
function studentSocket(io) {
    io.of("/student-socket").on("connection", (socket) => {
        const sessionId = socket.handshake.query.sessionId;
        const session = sessionDB_1.sessionDB.find((s) => s.id === sessionId);
        if (!session) {
            socket.emit("session-not-found", "Session not found");
            socket.disconnect();
            return;
        }
        if (session.connect) {
            socket.emit("session-already-connected", "Session already connected");
            socket.disconnect();
            return;
        }
        session.connect = true;
        socket.join(`student-${sessionId}`);
        socket.emit("student-session-connect", {
            msg: "Student session created successfully",
        });
        socket.on("update-code", (data) => __awaiter(this, void 0, void 0, function* () {
            io.of("/mentor-socket").emit("receive-update-code", {
                sessionId: sessionId,
                newCode: data.newCode,
            });
        }));
        socket.on("disconnect", () => {
            const session = sessionDB_1.sessionDB.find((s) => s.id === sessionId);
            if (!session)
                socket.emit("session-not-found", "Session not found");
            else {
                session.connect = false;
                socket.emit("session-disconnect", "Session disconnect successfully");
            }
        });
    });
}
exports.default = studentSocket;
