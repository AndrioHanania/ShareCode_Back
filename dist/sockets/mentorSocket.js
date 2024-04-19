"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sessionDB_1 = require("../db/sessionDB");
const { v4: uuidv4 } = require("uuid");
//!! in both socket we do the same import so we need to extract them to one shared file !!
function mentorSocket(io) {
    io.of("/mentor-socket").on("connection", (socket) => {
        const codeBlockId = socket.handshake.query.codeBlockId;
        const sessionId = uuidv4();
        sessionDB_1.sessionDB.push({ id: sessionId, connect: false, codeBlockId });
        socket.join(`mentor-${sessionId}`);
        socket.emit("mentor-session-connect", {
            msg: "Mentor session created successfully",
            sessionId: sessionId,
        });
        socket.on("disconnect", () => {
            const sessionIdx = sessionDB_1.sessionDB.findIndex((s) => s.id === sessionId);
            if (sessionIdx != -1)
                socket.emit("session-not-found", "Session not found");
            else {
                sessionDB_1.sessionDB.splice(sessionIdx, 1);
                socket.emit("session-disconnect", "Session disconnect successfully");
            }
        });
    });
}
exports.default = mentorSocket;
